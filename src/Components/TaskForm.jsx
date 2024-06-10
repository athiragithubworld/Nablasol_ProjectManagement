import React, { useState } from "react";

const TasksForm = ({ data, saveData }) => {
  const [tasks, setTasks] = useState(data.tasks || []);
  const [newTask, setNewTask] = useState("");

  // Function to add a new task to the list
  const addTask = () => {
    if (newTask.trim() !== "") {
      const updatedTasks = [...tasks, { name: newTask, completed: false }];
      setTasks(updatedTasks);
      saveData({ tasks: updatedTasks });
      setNewTask("");
    }
  };

  // Function to remove a task from the list
  const removeTask = (taskName) => {
    const updatedTasks = tasks.filter((task) => task.name !== taskName);
    setTasks(updatedTasks);
    saveData({ tasks: updatedTasks });
  };

  // Function to toggle the completion status of a task
  const toggleTask = (taskName) => {
    const updatedTasks = tasks.map((task) =>
      task.name === taskName ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveData({ tasks: updatedTasks });
  };

  return (
    <form>
      <h2 className="text-2xl font-bold mb-4 text-center">Tasks</h2>
      {/* Input field and button to add new tasks */}
      <div className="mb-4 flex items-center">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a task"
          className="mt-1 block w-full border border-gray-300 rounded py-2 px-4"
        />
        <button
          type="button"
          onClick={addTask}
          className="bg-blue-500 text-white py-2 px-4 rounded ml-2"
        >
          Add
        </button>
      </div>
      {/* List of tasks with options to toggle completion and remove tasks */}
      <ul className="mb-4">
        {tasks.map((task) => (
          <li
            key={task.name}
            className="flex items-center justify-between py-2"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.name)}
                className="mr-2"
              />
              <span className={task.completed ? "line-through" : ""}>
                {task.name}
              </span>
            </div>
            <button
              type="button"
              onClick={() => removeTask(task.name)}
              className="text-red-500"
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
    </form>
  );
};

export default TasksForm;
