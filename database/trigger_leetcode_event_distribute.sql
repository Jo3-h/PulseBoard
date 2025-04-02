CREATE TRIGGER trigger_leetcode_event_distribute_values
AFTER INSERT OR UPDATE ON leetcode_activity
FOR EACH ROW
WHEN (NEW.event_type IN ('Solution', 'Submission'))
EXECUTE FUNCTION leetcode_event_distribute_values();