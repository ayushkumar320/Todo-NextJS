"use client";
import React from "react";
import {useState, useEffect} from "react";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function Card() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTaskText, setNewTaskText] = useState("");

  useEffect(() => {
    const savedTasks = localStorage.getItem("todoTasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
  }, [tasks]);

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? {...task, completed: !task.completed} : task
      )
    );
  };

  const deleteTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("todoTasks", JSON.stringify(updatedTasks));
  };

  const addTask = () => {
    if (newTaskText.trim()) {
      const newTask: Task = {
        id: Date.now(),
        text: newTaskText.trim(),
        completed: false,
      };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      localStorage.setItem("todoTasks", JSON.stringify(updatedTasks));
      setNewTaskText("");
      setShowAddTask(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-w-screen min-h-screen bg-gray-800 text-white font-sans">
      <div className="bg-gray-900 p-10 rounded-lg shadow-lg max-w-2xl w-full min-h-[400px] flex justify-center items-center flex-col relative overflow-hidden">
        <div
          className={`w-full transition-transform duration-500 ease-in-out ${
            showAddTask
              ? "-translate-x-full opacity-0"
              : "translate-x-0 opacity-100"
          }`}
        >
          <h2 className="text-3xl font-bold mb-6">To Do List</h2>
          <ul className="flex flex-col space-y-4 w-full overflow-y-auto max-h-60 mb-6">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="list-inside text-white bg-gray-950 p-4 rounded-lg shadow-md w-full hover:bg-gray-800 flex items-center gap-3"
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
                />
                <span
                  className={`flex-1 cursor-pointer ${
                    task.completed ? "line-through text-gray-400" : ""
                  }`}
                  onClick={() => toggleTask(task.id)}
                >
                  {task.text}
                </span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:cursor-pointer hover:bg-red-700 hover:shadow-lg transition-all duration-200"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setShowAddTask(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:cursor-pointer hover:bg-blue-700 hover:shadow-md transition-all duration-200 w-full"
          >
            Add Task
          </button>
        </div>

        <div
          className={`absolute inset-0 p-10 bg-gray-900 rounded-lg transition-transform duration-500 ease-in-out flex flex-col ${
            showAddTask
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }`}
        >
          <h2 className="text-3xl font-bold mb-6 text-white">Add New Task</h2>
          <div className="flex flex-col space-y-4">
            <div className="mb-20">
              <label
                htmlFor="taskInput"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Task Description
              </label>
              <input
                id="taskInput"
                type="text"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addTask()}
                placeholder="Enter your task..."
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={addTask}
                disabled={!newTaskText.trim()}
                className="flex-1 bg-blue-500 text-white px-4 py-2 rounded font-semibold hover:bg-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                Add Task
              </button>
              <button
                onClick={() => {
                  setShowAddTask(false);
                  setNewTaskText("");
                }}
                className="flex-1 bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 hover:bg-gray-600 transition-all duration-200 cursor-pointer"
              >
                View Tasks
              </button>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setNewTaskText("")}
                className="flex-1 bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 hover:bg-gray-600 transition-all duration-200 cursor-pointer"
              >
                Clear
              </button>
              <button
                onClick={() => {
                  if (tasks.length > 0) {
                    const confirmed = window.confirm(
                      "Are you sure you want to delete all tasks?"
                    );
                    if (confirmed) {
                      setTasks([]);
                    }
                  }
                }}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded border border-red-500 hover:bg-red-700 transition-all duration-200 cursor-pointer"
              >
                Delete All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
