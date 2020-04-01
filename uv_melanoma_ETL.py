# Dependencies and Setup
import pandas as pd

def get_data():
    # Resources #1: CDI (Chronic Disease Indicators) Data
    CDI_data_to_load = "CDI_data.csv"

    # Read the CDI Data
    CDI_data_pd = pd.read_csv(CDI_data_to_load, encoding="utf-8").fillna(0)

    # Extracting cancer data
    topic_sorted_df = CDI_data_pd.groupby('Topic')
    cancer_df = topic_sorted_df.get_group('Cancer') 
    cancer_df = cancer_df.sort_values('LocationDesc')

    new_cancer_df = cancer_df[['LocationAbbr','LocationDesc','Topic', 'Question','DataValueType','DataValue']].copy()

    # Extracting melanoma cancer data for both incidence and mortality
    incidence_df = new_cancer_df.loc[new_cancer_df['Question'] == 'Invasive melanoma, incidence']
    incidence_df = incidence_df.loc[incidence_df['DataValueType'] == 'Average Annual Number']
    incidence_df.set_index('LocationAbbr', inplace=True)
    incidence_df.drop(["AK", "HI", "US"], inplace = True) 

    mortality_df = new_cancer_df.loc[new_cancer_df['Question'] == 'Melanoma, mortality']
    mortality_df = mortality_df.loc[mortality_df['DataValueType'] == 'Average Annual Number']
    mortality_df.set_index('LocationAbbr', inplace=True)
    mortality_df.drop(["AK", "HI", "US"], inplace = True) 

    # Resources #2: UV Exposure Data
    UV_data_to_load = "UV_data.csv"

    # Read the UV Exposure Data
    UV_data_df = pd.read_csv(UV_data_to_load, encoding="utf-8").fillna(0)

    # Group the data by states and get the mean of UV exposure for each states
    UV_data_df = UV_data_df.groupby("STATENAME", as_index=False)["UV_Wh/square_meter"].mean()

    # Convert the data frame of melanoma incidence data to dictionary
    incidence_dict = incidence_df.to_dict("records")

    # Convert the data frame of melanoma mortality data to dictionary
    mortality_dict = mortality_df.to_dict("records")

    # Convert the data frame of UV exposure data to dictionary
    UV_dict = UV_data_df.to_dict("records")

    return incidence_dict, mortality_dict, UV_dict
