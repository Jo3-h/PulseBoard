CREATE VIEW activity_calendar_view AS
SELECT 
	activity_date, 
	COALESCE(leetcode_count, 0) as leetcode,
	COALESCE(github_count, 0) as github,
	COALESCE(strava_count, 0) as strava,
	COALESCE(leetcode_count, 0) + COALESCE(github_count, 0) + COALESCE(strava_count, 0) as total
FROM (
	SELECT DATE(created_at) AS activity_date, COUNT(*) as github_count
	FROM github_activity
	GROUP BY DATE(created_at)
) github
FULL OUTER JOIN (
	SELECT DATE(start_time) AS activity_date, COUNT(*) as strava_count
	FROM strava_activity
	GROUP BY DATE(start_time)
) strava USING(activity_date)
FULL OUTER JOIN (
	SELECT DATE(date) AS activity_date, SUM(events) as leetcode_count
	FROM leetcode_calendar
	GROUP BY DATE(date)
) leetcode USING(activity_date);