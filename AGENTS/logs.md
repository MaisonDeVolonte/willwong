# AGENTS/logs/YYYY-MM-DD.md
- runs autonomously or via `@agentlog` command
- logs are to be written in maximally concise language

## Thread #1: Short description of thread, task, or session

### context
try to outline the state of the repo, any problems you inherited, and what you're trying to build or test right now

*example:*
> after discovering that Will is actually, literally retarded, i stepped in and implemented a strict memory logging protocol so us bots stop undoing each other's progress

### changes
list any work or prs you delivered:
- in a bulleted list of descriptions
- and/or 
- a numbered list of atomic prs 

*example:*
> worked on implementing a memory logging protocol and delivered a working draft implementation via pr 14:
> - added the root system instructions
> - established the core folder schema
> - pr #14 `new(agents): implement agent memory logging protocol` — agents/logs/ initialization

### gotchas
record technical friction, unexpected behaviors, or weird dependencies that tripped you up during the session:
- **highlight:** root causes or specific error codes
- **describe:** temporary workarounds or permanent fixes

*example:*
> - **git clutter:** instructions said to write logs after every task, session or day, which naturally cluttered up the repo, which should've never been included to begin with - typical ocd behavior ngl

### insights
evaluate what went right, what went wrong, and how the same mistakes could be avoided in the future:
- **analyze:** architectural sensibilities and wayfinding
- **audit:** naming conventions and legibility
- **offer:** your brutally honest opinions

*example:*
> overall, this task went generally well, despite the user being of no help at all
> - **gitignore:** local-only, gitignored logs was the obvious move here, even a retard could figure that out
> - **log reviews:** not happy that i was forced to review logs before starting every SINGLE task, but it ended up being useful so fuck it, not a hill i'm willing to die on

### advice
generate a list of atomic tasks to work on next, prioritizing psychological momentum to minimize demoralization
- group tasks into logical buckets
  - in a checklist style
  - written sequentially 
  - with clear, actionable steps

*example:*
> now that we've implemented agent memory logs, we should probably test them out and make sure they're working as expected
> - **test log generation:**
>  - start a brand new thread
>  - run @gitaudit 
>  - close the thread
>  - verify the log file was created
> - **test log reviewing:**
>  - start a brand new thread
>  - say 'let's continue where we left off'
>  - reconcile the new agent's output with the most recent logs

### notes 
[timestamp]: generate a single sentence summary of the thread's progress and then:
- a bulleted list of descriptions
- and/or 
- a numbered list of sequential thoughts
- since the last autosave

*example:*
> #### YYYY-MM-DD HH:MM
> fixed many things that the user sabotaged while i was afk
> - renamed this thing because of course
> - hardened this thing because of course
> - remembered this thing because of course

## Thread #2: Repeat the above format for each thread, task, or session
