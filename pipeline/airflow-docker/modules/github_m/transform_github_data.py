# modules/github/transform_github_data.py
''' This module is responsible for transforming the GitHub data. '''
import json

def transform_github_data():

    print('Transforming GitHub data...')

    # Load the data from the extracted JSON file
    with open('github_data.json', 'r') as file:
        data = json.load(file)

    for event in data:
        event['created_at'] = event['created_at'].replace('Z','')

    with open('github_data_transformed.json', 'w') as file:
        json.dump(data, file, indent=4)

    print('Data transformed successfully!\n')

    return