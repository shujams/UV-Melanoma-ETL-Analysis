from flask import Flask, render_template
import pymongo

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
    # write a statement that finds all the items in the db and sets it to a variable
    incidences = list(db.collection_incidence.find())
    mortalities = list(db.collection_mortality.find())
    uvs = list(db.collection_uv.find())
    print(incidences)
    print(mortalities)
    print(uvs)

    # render an index.html template and pass it the data you retrieved from the database
    return render_template("index.html", )


if __name__ == "__main__":
    app.run(debug=True)