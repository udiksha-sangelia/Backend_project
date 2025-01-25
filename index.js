
const fs = require("fs");
const path = require("path");

// Path to tasks JSON file
const filePath = path.join(__dirname, "tasks.json");

// Ensure the tasks file exists
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify([]));
}

// Read tasks from JSON file
const readTasks = () => {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data || "[]");
};

// Write tasks to JSON file
const writeTasks = (tasks) => {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
};


// Parse command-line arguments
const [action, ...args] = process.argv.slice(2);

switch (action) {
  case "add": {
    const description = args.join(" ");
    if (!description) {
      console.log("Error: Task description cannot be empty!");
      break;
    }
    const tasks = readTasks();
    const newTask = {
      id: tasks.length + 1,
      description,
      status: "not done",
    };
    tasks.push(newTask);
    writeTasks(tasks);
    console.log(`Task added: "${description}"`);
    break;
  }

  case "list": {
    const filter = args[0]; // Optional filter argument
    const tasks = readTasks();
    if (tasks.length === 0) {
      console.log("No tasks found!");
      break;
    }

    const filteredTasks = filter
      ? tasks.filter((task) => task.status === filter)
      : tasks;

    if (filteredTasks.length === 0) {
      console.log(`No tasks found with status "${filter}"!`);
      break;
    }

    console.log("\nTasks:");
    filteredTasks.forEach((task) => {
      console.log(`[${task.id}] ${task.description} - ${task.status}`);
    });
    break;
  }

  case "update": {
    const [id, ...descriptionArr] = args;
    const description = descriptionArr.join(" ");
    if (!id || !description) {
      console.log("Error: Please provide both task ID and new description.");
      break;
    }
    const tasks = readTasks();
    const task = tasks.find((t) => t.id === parseInt(id));
    if (!task) {
      console.log(`Error: Task with ID ${id} not found.`);
      break;
    }
    task.description = description;
    writeTasks(tasks);
    console.log(`Task [${id}] updated to: "${description}"`);
    break;
  }

  case "done": {
    const id = args[0];
    if (!id) {
      console.log("Error: Please provide a task ID.");
      break;
    }
    const tasks = readTasks();
    const task = tasks.find((t) => t.id === parseInt(id));
    if (!task) {
      console.log(`Error: Task with ID ${id} not found.`);
      break;
    }
    task.status = "done";
    writeTasks(tasks);
    console.log(`Task [${id}] marked as done.`);
    break;
  }

  case "progress": {
    const id = args[0];
    if (!id) {
      console.log("Error: Please provide a task ID.");
      break;
    }
    const tasks = readTasks();
    const task = tasks.find((t) => t.id === parseInt(id));
    if (!task) {
      console.log(`Error: Task with ID ${id} not found.`);
      break;
    }
    task.status = "in progress";
    writeTasks(tasks);
    console.log(`Task [${id}] marked as in progress.`);
    break;
  }

  case "delete": {
    const id = args[0];
    if (!id) {
      console.log("Error: Please provide a task ID.");
      break;
    }
    const tasks = readTasks();
    const newTasks = tasks.filter((t) => t.id !== parseInt(id));
    if (tasks.length === newTasks.length) {
      console.log(`Error: Task with ID ${id} not found.`);
      break;
    }
    writeTasks(newTasks);
    console.log(`Task [${id}] deleted.`);
    break;
  }

}
