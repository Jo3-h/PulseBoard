# modules/strava_m/load_strava_data.py

from dotenv import load_dotenv
import os
import json
import psycopg2

load_dotenv()

def load_strava_data():

    print('Loading Strava data...   ', end='')

    # load the transformed data
    with open('strava_data_transformed.json', 'r') as file:
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
                INSERT INTO strava_activity (activity_id, activity_type, name, description, distance_ms, duration_sec, elapsed_sec, start_time, average_pace, elevation_gain, map_polyline, start_lat, start_lon, end_lat, end_lon, kudos_count, is_private, max_speed, achievement_count, comment_count, commute)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                ON CONFLICT (activity_id) 
                DO UPDATE SET 
                    activity_id = EXCLUDED.activity_id,
                    activity_type = EXCLUDED.activity_type,
                    name = EXCLUDED.name,
                    description = EXCLUDED.description,
                    distance_ms = EXCLUDED.distance_ms,
                    duration_sec = EXCLUDED.duration_sec,
                    elapsed_sec = EXCLUDED.elapsed_sec,
                    start_time = EXCLUDED.start_time,
                    average_pace = EXCLUDED.average_pace,
                    elevation_gain = EXCLUDED.elevation_gain,
                    map_polyline = EXCLUDED.map_polyline,
                    start_lat = EXCLUDED.start_lat,
                    start_lon = EXCLUDED.start_lon,
                    end_lat = EXCLUDED.end_lat,
                    end_lon = EXCLUDED.end_lon,
                    kudos_count = EXCLUDED.kudos_count,
                    is_private = EXCLUDED.is_private,
                    max_speed = EXCLUDED.max_speed,
                    achievement_count = EXCLUDED.achievement_count,
                    comment_count = EXCLUDED.comment_count,
                    commute = EXCLUDED.commute;

                """,(record['activity_id'], record['activity_type'], record['name'], record['description'], record['distance_ms'], record['duration_sec'], record['elapsed_sec'], record['start_time'], record['average_pace'], record['elevation_gain'], record['map_polyline'], record['start_lat'], record['start_lon'], record['end_lat'], record['end_lon'], record['kudos_count'], record['is_private'], record['max_speed'], record['achievement_count'], record['comment_count'], record['commute'])
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