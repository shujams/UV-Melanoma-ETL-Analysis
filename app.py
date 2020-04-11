from flask import Flask, render_template, jsonify
import pymongo
import uv_melanoma_ETL

app = Flask(__name__)

# setup mongo connection
conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)

# connect to mongo db and collection
db = client.uv_melanoma_db
collection_incidence = db.melanoma_incidence
collection_mortality = db.melanoma_mortality
collection_uv = db.uv

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/uv-melanoma")
def uv_melanoma():
    return render_template("uv_melanoma.html")

@app.route("/top-10-states-melanoma")
def top_10_melanoma():
    return render_template("top_10_melanoma.html")

@app.route("/worldwide-melanoma")
def worldwide_melanoma():
    return render_template("worldwide-melanoma.html")

# Create a route that contains all the data we need to build the charts
@app.route("/api/get_all_data")
def get_all_data():
    
    # Pull the data from database and combine them to a json format
    incidences_clean = []
    mortalities_clean = []
    uvs_clean = []

    incidences = collection_incidence.find()
    mortalities = collection_mortality.find()
    uvs = collection_uv.find()
    
    for incidence in incidences:
        incidence["_id"] = str(incidence["_id"])
        incidences_clean.append(incidence)

    for mortality in mortalities:
        mortality["_id"] = str(mortality["_id"])
        mortalities_clean.append(mortality)  

    for uv in uvs:
        uv["_id"] = str(uv["_id"])
        uvs_clean.append(uv)

    all_data = {
        "incidences": incidences_clean,
        "mortalities": mortalities_clean,
        "uvs": uvs_clean
    }
    return jsonify(all_data)

@app.route("/api/upload_to_db")
def upload_to_db():
    # Drops collection if available to remove duplicates
    db.melanoma_incidence.drop()
    db.melanoma_mortality.drop()
    db.uv.drop()

    # Run the get_data function
    incidence_dict, mortality_dict, UV_dict = uv_melanoma_ETL.get_data()

    # Update the Mongo database
    for incidence_data in incidence_dict:
        collection_incidence.insert_one(incidence_data)

    for mortality_data in mortality_dict:
        collection_mortality.insert_one(mortality_data)

    for UV_data in UV_dict:
        collection_uv.insert_one(UV_data)

    return "Data uploaded!"

@app.route('/test', methods=['GET'])
def test():
    return jsonify({'msg': 'This is a Test'})

if __name__ == "__main__":
    app.run(debug=True)