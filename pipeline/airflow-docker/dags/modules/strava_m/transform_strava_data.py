# modules/strava_m/transform_strava_data.py

# modules/strava_m/transform_strava_data.py

import json

def transform_strava_data():
    print('Transforming Strava data...  ', end='')

    # Load the data from the extracted JSON file
    try:
        with open('strava_data.json', 'r') as file:
            data = json.load(file)
    except FileNotFoundError:
        print('Error: strava_data.json file not found.')
        return
    except json.JSONDecodeError:
        print('Error: Invalid JSON format in strava_data.json.')
        return

    activity_data = []
    for activity in data:
        start_latlng = activity.get('start_latlng') or [None, None]
        end_latlng = activity.get('end_latlng') or [None, None]

        map_data = activity.get('map', {})
        summary_polyline = map_data.get('summary_polyline')

        activity_data.append({
            'activity_id': activity.get('id'),
            'activity_type': activity.get('sport_type'),
            'name': activity.get('name'),
            'description': activity.get('description'),
            'distance_ms': int(activity.get('distance', 0)),
            'duration_sec': int(activity.get('moving_time', 0)),
            'elapsed_sec': int(activity.get('elapsed_sec', 0)),  # fixed typo: 'elapsed_sec' -> 'elapsed_time'
            'start_time': (activity.get('start_date_local') or '').replace('Z', ''),
            'average_pace': activity.get('average_speed', 0),
            'elevation_gain': activity.get('total_elevation_gain', 0),
            'map_polyline': summary_polyline,
            'start_lat': start_latlng[0],
            'start_lon': start_latlng[1],
            'end_lat': end_latlng[0],
            'end_lon': end_latlng[1],
            'kudos_count': activity.get('kudos_count', 0),
            'is_private': activity.get('is_private', False),
            'comment_count': activity.get('comment_count', 0),
            'achievement_count': activity.get('achievement_count', 0),
            'max_speed': activity.get('max_speed', 0),
            'commute': activity.get('commute', False),
        })

    try:
        with open('strava_data_transformed.json', 'w') as file:
            json.dump(activity_data, file, indent=4)
    except IOError:
        print('Error: Could not write to strava_data_transformed.json.')
        return

    print('Data transformed successfully!\n')
    return
