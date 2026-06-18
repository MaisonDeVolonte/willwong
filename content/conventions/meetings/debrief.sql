SELECT mistakes_made, refactor_actions
FROM project_history
WHERE timeline = 'completed' AND technical_debt > 0;
-- Result: "Don't skip class name abstraction next time."
