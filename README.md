# Task Management CLI Tool

A simple Command-Line Interface (CLI) tool to manage tasks efficiently. You can add, list, update, mark as done or in progress, and delete tasks. Tasks are stored persistently in a `tasks.json` file.

---
Use this repository to add in your locals : git clone  https://github.com/udiksha-sangelia/Task_Tracker


## Features

- Add new tasks.
- List tasks with optional filters.
- Update task descriptions.
- Change task statuses (e.g., `done`, `in progress`).
- Delete tasks by their ID.

---

## Requirements

- **Node.js**: Make sure you have Node.js installed on your system.

---

## Usage Instructions

Run the tool using the following structure:

1. Add a Task : 
   node tasks.js add <task_description>

2. List Tasks : 
   node tasks.js list            # List all tasks
   node tasks.js list done       # List tasks with status "done"
   node tasks.js list not done   # List tasks with status "not done"
   node tasks.js list in progress # List tasks with status "in progress"
   
3. Update a Task : 
   node tasks.js update <task_id> <new_description>
   
4. Mark a Task as Done : 
   node tasks.js done <task_id>

5. Mark a Task as In Progress : 
   node tasks.js progress <task_id>

6. Delete a Task : 
   node tasks.js delete <task_id>

If you want more such backend projects then go to this site https://roadmap.sh/backend/projects







