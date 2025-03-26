# modules/github/load_github_data.py
from dotenv import load_dotenv
import psycopg2
import json
import os
load_dotenv()

def load_github_data():

    print('Loading GitHub data...')

    # load the transformed data
    with open('github_data_transformed.json', 'r') as file:
        data = json.load(file)

    # create connection to database
    connection = psycopg2.connect(
            dbname = os.getenv('DB_NAME'),
            user = os.getenv('DB_USER'),
            password = os.getenv('DB_PASS'),
            host = os.getenv('DB_HOST'),
            port = os.getenv('DB_PORT')
        )
    
    try:
        cursor = connection.cursor()

        for record in data:
            cursor.execute(
                """
                INSERT INTO github_activity (event_id, event_type, repo_owner, repo_name, repo_url, is_private, action, commit_count, created_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                ON CONFLICT (event_id) DO NOTHING
                """, (record['event_id'], record['event_type'], record['repo_owner'], record['repo_name'], record['repo_url'], record['is_private'], record['action'], record['commit_count'], record['created_at'])
            )

        connection.commit()

        print('Data loaded successfully!\n')

    except Exception as e:
        print(f"An error occurred: {e}")
        if connection:
            connection.rollback()

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()



    return