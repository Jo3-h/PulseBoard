# modules/strava_m/transform_strava_data.py

import json

def transform_strava_data():

    print('Transforming Strava data...  ', end='')

    # Load the data from the extracted JSON file
    with open('strava_data.json', 'r') as file:
        data = json.load(file)

    activity_data = []
    for activity in data:
        start_lat = activity['start_latlng'][0] if activity['start_latlng'] else None
        start_lon = activity['start_latlng'][1] if activity['start_latlng'] else None
        end_lat = activity['end_latlng'][0] if activity['end_latlng'] else None
        end_lon = activity['end_latlng'][1] if activity['end_latlng'] else None
        
        activity_data.append({
            'activity_id': activity['id'],
            'activity_type': activity['sport_type'],
            'name': activity['name'],
            'description': activity['description'],
            'distance_ms': int(activity['distance']),
            'duration_sec': int(activity['moving_time']),
            'elapsed_sec': int(activity['elapsed_sec']),
            'start_time': activity['start_date_local'].replace('Z', ''),
            'average_pace': activity['average_speed'],
            'elevation_gain': activity['total_elevation_gain'],
            'map_polyline': activity['map']['summary_polyline'],
            'start_lat': start_lat,
            'start_lon': start_lon,
            'end_lat': end_lat,
            'end_lon': end_lon,
            'kudos_count': activity['kudos_count'],
            'is_private':activity['is_private'],
            'comment_count': activity['comment_count'],
            'achievement_count': activity['achievement_count'],
            'max_speed': activity['max_speed'],
            'commute': activity['commute'],
        })

    with open('strava_data_transformed.json', 'w') as file:
        json.dump(activity_data, file, indent=4)

    print('Data transformed successfully!\n')

    return