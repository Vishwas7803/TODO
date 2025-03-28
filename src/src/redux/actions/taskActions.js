// redux/actions.js
export const addTask = (task) => ({
  type: "ADD_TASK",
  payload: task,
});

export const deleteTask = (id) => ({
  type: "DELETE_TASK",
  payload: id,
});

export const updateTask = (id, updatedText, updatedPriority) => ({
  type: "UPDATE_TASK",
  payload: { id, updatedText, updatedPriority },
});
