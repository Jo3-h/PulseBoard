# modules/leetcode_m/transfrom_leetcode_data.py

import json
from datetime import datetime

def transform_leetcode_data():

    print('Transforming LeetCode data...  ', end='')

    # Load the data from the extracted JSON file
    with open('leetcode_data.json', 'r') as file:
        data = json.load(file)

    badges_data = []
    for badge in data['badges']:
        badges_data.append({
            'badge_id':badge['id'],
            'badge_name': badge['displayName'],
            'icon': badge['icon'],
            'icon_gif': badge['medal']['config']['iconGif'] or None,
            'date_received': badge['creationDate'],
        })

    # Save the transformed data to a new JSON file
    with open('leetcode_badges_data.json', 'w') as file:
        json.dump(badges_data, file, indent=4)
    

    # Transform the submissions data
    event_data = []
    for submission in data['recent_ac_submissions']:
        stats_str = submission['stats']
        stats = json.loads(stats_str)
        event_data.append({
            'event_id' : int(submission['event_id']),
            'event_type' : submission['event_type'],
            'problem_name': submission['problem_name'],
            'problem_description': submission['problem_description'],
            'problem_url': submission['problem_url'],
            'created_at' : datetime.utcfromtimestamp(int(submission['timestamp'])).strftime('%Y-%m-%d %H:%M:%S'),
            'status': submission['status'],
            'difficulty': submission['difficulty'],
            'solution_name' : '',
            'solution_content': '',
            'solution_url' : '',
            'topics': submission['topics'],
            'total_accepted': stats['totalAccepted'],
            'total_submissions': stats['totalSubmission'],
            'total_accepted_ratio': stats['acRate'],
            'hits': 0,
            'likes': submission['likes'],
            'dislikes': submission['dislikes'],
        })

    for solution in data['recent_solutions']:
        event_data.append({
            'event_id' : solution['event_id'],
            'event_type' : solution['event_type'],
            'problem_name': solution['problem_name'],
            'problem_description':'',
            'problem_url': solution['problem_url'],
            'created_at' : solution['timestamp'],
            'status': 'Submitted',
            'difficulty': solution['difficulty'],
            'solution_name' : solution['solution_name'],
            'solution_content': solution['solution_content'],
            'solution_url' : solution['solution_url'],
            'total_accepted': 0,
            'total_submissions': 0,
            'total_accepted_ratio': 0,
            'topics': solution['topics'],
            'hits': solution['hits'],
            'likes': solution['likes'],
            'dislikes': solution['dislikes'],
        })

    # Save the transformed data to a new JSON file
    with open('leetcode_event_data.json', 'w') as file:
        json.dump(event_data, file, indent=4)


    # Transform the user data
    user = data['summary']['data']
    user_data = {
        'username' : data['summary']['username'],
        'date' : datetime.today().strftime('%Y-%m-%d'),
        'accepted_easy':user['numAcceptedQuestions'][0]['count'],
        'accepted_medium':user['numAcceptedQuestions'][1]['count'],
        'accepted_hard':user['numAcceptedQuestions'][2]['count'],
        'failed_easy': user['numFailedQuestions'][0]['count'],
        'failed_medium': user['numFailedQuestions'][1]['count'],
        'failed_hard': user['numFailedQuestions'][2]['count'],
        'untouched_easy': user['numUntouchedQuestions'][0]['count'],
        'untouched_medium': user['numUntouchedQuestions'][1]['count'],
        'untouched_hard': user['numUntouchedQuestions'][2]['count'],
        'beats_easy': user['userSessionBeatsPercentage'][0]['percentage'],
        'beats_medium': user['userSessionBeatsPercentage'][1]['percentage'],
        'beats_hard': user['userSessionBeatsPercentage'][2]['percentage'],
    }

    with open('leetcode_user_data.json', 'w') as file:
        json.dump(user_data, file, indent=4)


    # Transform the calendar data
    calendar_data = []
    calendar_str = data['calendar']['data']['matchedUser']['userCalendar']['submissionCalendar']
    calendar = json.loads(calendar_str)
    calendar_data = [
        {
        "date": datetime.utcfromtimestamp(int(timestamp)).strftime('%Y-%m-%d'),
        "count": count
        }
    for timestamp, count in calendar.items()
    ]

    with open('leetcode_calendar_data.json', 'w') as file:
        json.dump(calendar_data, file, indent=4)

    print('Data transformed successfully!\n')

    return