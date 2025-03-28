import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  
  // Load tasks from localStorage or initialize with an empty array
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState("");

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const addTask = () => {
    if (newTask.trim() === "") {
      alert("Please enter a task.");
      return;
    }

    const newTaskObj = { id: Date.now(), text: newTask, completed: false };
    setTasks((prevTasks) => [...prevTasks, newTaskObj]);
    setNewTask("");
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const startEditing = (id, text) => {
    setEditingTaskId(id);
    setEditedTaskText(text);
  };

  const cancelEditing = () => {
    setEditingTaskId(null);
    setEditedTaskText("");
  };

  const saveEdit = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, text: editedTaskText } : task
    );
    setTasks(updatedTasks);
    setEditingTaskId(null);
    setEditedTaskText("");
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div style={styles.container}>
      {/* Navigation Bar */}
      <nav style={styles.navbar}>
        <h1>Task Manager</h1>
        <button
          onClick={handleLogout}
          style={styles.logoutButton}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        >
          Logout
        </button>
      </nav>

      <div style={styles.content}>
        {/* Task Input Section */}
        <div style={styles.taskInputContainer}>
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTask}
            onChange={handleInputChange}
            style={styles.input}
          />
          <button
            onClick={addTask}
            style={styles.addButton}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          >
            Add Task
          </button>
        </div>

        {/* Task List */}
        <div style={styles.taskList}>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div key={task.id} style={styles.task}>
                {editingTaskId === task.id ? (
                  <>
                    <input
                      type="text"
                      value={editedTaskText}
                      onChange={(e) => setEditedTaskText(e.target.value)}
                      style={styles.editInput}
                    />
                    <div style={styles.buttonGroup}>
                      <button
                        onClick={() => saveEdit(task.id)}
                        style={styles.saveButton}
                      >
                        ✅ Save
                      </button>
                      <button
                        onClick={cancelEditing}
                        style={styles.cancelButton}
                      >
                        ❌ Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <span>{task.text}</span>
                    <div style={styles.buttonGroup}>
                      <button
                        onClick={() => startEditing(task.id, task.text)}
                        style={styles.editButton}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        style={styles.deleteButton}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          ) : (
            <p>No tasks available. Add some!</p>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #74EBD5, #ACB6E5)",
    color: "#333",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    display: "flex",
    flexDirection: "column",
    transition: "background 0.5s ease-in-out",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 30px",
    backgroundColor: "#2c3e50",
    color: "#fff",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
  },
  logoutButton: {
    background: "linear-gradient(135deg, #ff4d4d, #d32f2f)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    padding: "12px 30px",
    transition: "all 0.3s ease",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 20px",
    flex: 1,
  },
  taskInputContainer: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "30px",
    backgroundColor: "#fff",
    padding: "20px 30px",
    borderRadius: "12px",
    boxShadow: "0 12px 30px rgba(0, 0, 0, 0.1)",
  },
  input: {
    flex: 1,
    padding: "14px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    outline: "none",
  },
  addButton: {
    padding: "14px 35px",
    background: "linear-gradient(135deg, #4caf50, #45a049)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "transform 0.3s",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
  },
  taskList: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    width: "100%",
    maxWidth: "600px",
  },
  task: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 25px",
    borderRadius: "10px",
    background: "white",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
  },
};

export default Home;
