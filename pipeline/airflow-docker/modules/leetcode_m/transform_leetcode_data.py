# modules/leetcode_m/transfrom_leetcode_data.py

import json
from datetime import datetime

def transform_leetcode_data():

    print('Transforming LeetCode data...  ', end='')

    # Try loading the data from the extracted JSON file
    try:
        with open('leetcode_data.json', 'r') as file:
            data = json.load(file)
    except FileNotFoundError:
        print('Error: leetcode_data.json file not found.')
        return
    except json.JSONDecodeError:
        print('Error: Failed to decode JSON from leetcode_data.json.')
        return

    badges_data = []
    try:
        for badge in data.get('badges', []):
            badges_data.append({
                'badge_id': badge.get('id'),
                'badge_name': badge.get('displayName'),
                'icon': badge.get('icon'),
                'icon_gif': badge.get('medal', {}).get('config', {}).get('iconGif') or None,
                'date_received': badge.get('creationDate'),
            })

        # Save the transformed data to a new JSON file
        with open('leetcode_badges_data.json', 'w') as file:
            json.dump(badges_data, file, indent=4)
    except Exception as e:
        print(f"Error transforming badges data: {e}")

    # Transform the submissions data
    event_data = []
    try:
        for submission in data.get('recent_ac_submissions', []):
            stats_str = submission.get('stats', '{}')
            try:
                stats = json.loads(stats_str)
            except json.JSONDecodeError:
                print(f"Error: Invalid stats format for submission {submission.get('event_id')}")
                stats = {}

            event_data.append({
                'event_id': int(submission.get('event_id', 0)),
                'event_type': submission.get('event_type', ''),
                'problem_name': submission.get('problem_name', ''),
                'problem_description': submission.get('problem_description', ''),
                'problem_url': submission.get('problem_url', ''),
                'created_at': datetime.utcfromtimestamp(int(submission.get('timestamp', 0))).strftime('%Y-%m-%d %H:%M:%S'),
                'status': submission.get('status', ''),
                'difficulty': submission.get('difficulty', ''),
                'solution_name': '',
                'solution_content': '',
                'solution_url': '',
                'topics': submission.get('topics', ''),
                'total_accepted': stats.get('totalAccepted', 0),
                'total_submissions': stats.get('totalSubmission', 0),
                'total_accepted_ratio': stats.get('acRate', 0),
                'hits': None,
                'likes': submission.get('likes', 0),
                'dislikes': submission.get('dislikes', 0),
            })

        # Process solutions
        for solution in data.get('recent_solutions', []):
            event_data.append({
                'event_id': solution.get('event_id', 0),
                'event_type': solution.get('event_type', ''),
                'problem_name': solution.get('problem_name', ''),
                'problem_description': None,
                'problem_url': solution.get('problem_url', ''),
                'created_at': solution.get('timestamp', ''),
                'status': 'Submitted',
                'difficulty': solution.get('difficulty', ''),
                'solution_name': solution.get('solution_name', ''),
                'solution_content': solution.get('solution_content', ''),
                'solution_url': solution.get('solution_url', ''),
                'total_accepted': None,
                'total_submissions': None,
                'total_accepted_ratio': None,
                'topics': solution.get('topics', ''),
                'hits': solution.get('hits', 0),
                'likes': solution.get('likes', 0),
                'dislikes': solution.get('dislikes', 0),
            })

        # Save the transformed event data
        with open('leetcode_event_data.json', 'w') as file:
            json.dump(event_data, file, indent=4)
    except Exception as e:
        print(f"Error transforming event data: {e}")

    # Transform the user data
    try:
        user = data.get('summary', [{}])[0].get('data', {})
        user_data = {
            'username': data.get('summary', [{}])[0].get('username', ''),
            'date': datetime.today().strftime('%Y-%m-%d'),
            'accepted_easy': user.get('numAcceptedQuestions', [{}])[0].get('count', 0),
            'accepted_medium': user.get('numAcceptedQuestions', [{}])[1].get('count', 0),
            'accepted_hard': user.get('numAcceptedQuestions', [{}])[2].get('count', 0),
            'failed_easy': user.get('numFailedQuestions', [{}])[0].get('count', 0),
            'failed_medium': user.get('numFailedQuestions', [{}])[1].get('count', 0),
            'failed_hard': user.get('numFailedQuestions', [{}])[2].get('count', 0),
            'untouched_easy': user.get('numUntouchedQuestions', [{}])[0].get('count', 0),
            'untouched_medium': user.get('numUntouchedQuestions', [{}])[1].get('count', 0),
            'untouched_hard': user.get('numUntouchedQuestions', [{}])[2].get('count', 0),
            'beats_easy': user.get('userSessionBeatsPercentage', [{}])[0].get('percentage', 0),
            'beats_medium': user.get('userSessionBeatsPercentage', [{}])[1].get('percentage', 0),
            'beats_hard': user.get('userSessionBeatsPercentage', [{}])[2].get('percentage', 0),
            'ranking': user.get('ranking', ''),
        }
        user_data = [user_data]

        with open('leetcode_user_data.json', 'w') as file:
            json.dump(user_data, file, indent=4)
    except Exception as e:
        print(f"Error transforming user data: {e}")

    # Transform the calendar data
    try:
        calendar_data = []
        calendar_str = data.get('calendar', {}).get('data', {}).get('matchedUser', {}).get('userCalendar', {}).get('submissionCalendar', '{}')
        try:
            calendar = json.loads(calendar_str)
        except json.JSONDecodeError:
            print("Error: Invalid calendar format.")
            calendar = {}

        calendar_data = [
            {
                "date": datetime.utcfromtimestamp(int(timestamp)).strftime('%Y-%m-%d'),
                "events": count
            }
            for timestamp, count in calendar.items()
        ]

        with open('leetcode_calendar_data.json', 'w') as file:
            json.dump(calendar_data, file, indent=4)
    except Exception as e:
        print(f"Error transforming calendar data: {e}")

    print('Data transformed successfully!\n')

    return
