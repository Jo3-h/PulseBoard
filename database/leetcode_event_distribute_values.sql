DROP FUNCTION leetcode_event_distribute_values();
CREATE OR REPLACE FUNCTION leetcode_event_distribute_values()
RETURNS VOID AS $$
BEGIN
	UPDATE leetcode_activity sol
	SET
		problem_description = COALESCE(sol.problem_description, sub.problem_description),
		total_accepted = COALESCE(sol.total_accepted, sub.total_accepted),
		total_submissions = COALESCE(sol.total_submissions, sub.total_submissions),
		total_accepted_ratio = COALESCE(sol.total_accepted_ratio, sub.total_accepted_ratio)
	FROM leetcode_activity sub
	WHERE sol.problem_name = sub.problem_name
	AND sol.event_type = 'Solution'
	AND sub.event_type = 'Submission';
	
END;
$$ LANGUAGE plpgsql;