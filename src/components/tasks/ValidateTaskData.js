export const validateTaskData = (editData) => {
  if (!editData.todosName.trim()) {
    return "Task name cannot be empty";
  }

  if (editData.todosName.length > 15) {
    return "Task name must be less than or equal to 15 characters";
  }

  for (const item of editData.todosInfo) {
    if (!item.todosInfo.trim()) {
      return "Task information cannot be empty";
    }
    if (item.todosInfo.length > 30) {
      return "Task information must be less than or equal to 30 characters";
    }

    if (editData.todosType === "personal") {
      if (!item.whattodo.trim()) {
        return "What to do cannot be empty";
      }
      if (item.whattodo.length > 30) {
        return "What to do must be less than or equal to 30 characters";
      }
    }

    if (editData.todosType === "work") {
      if (!item.project.trim()) {
        return "Project cannot be empty";
      }
      if (item.project.length > 30) {
        return "Project must be less than or equal to 30 characters";
      }
      if (!item.deadline) {
        return "Deadline cannot be empty";
      }
    }
  }

  return null;
};
