import { defineStore } from "pinia";
import { supabase } from "../supabase/supabase";
import { useUserStore } from "./userStore";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [],
    dataLoaded: false,
    errorMsg: null,
  }),
  actions: {
    // Fetching Tasks from databse "Supabase"
    async fetchTasks() {
      try {
        this.dataLoaded = false;
        const userStore = useUserStore();
        const user = userStore.user;

        if (!user) throw new Error("User not logged in.");

        const { data: tasks, error } = await supabase
          .from("todos")
          .select("*")
          .eq("user_id", user.id);

        if (error) throw error;
        this.tasks = tasks;
      } catch (error) {
        this.errorMsg = error.message;
        console.error("Error fetching tasks:", error);
      } finally {
        this.dataLoaded = true;
      }
    },

    // Fetch a single Task by its ID
    async fetchTaskById(todoId) {
      try {
        const { data: todos, error } = await supabase
          .from("todos")
          .select("*")
          .eq("id", todoId);
        if (error) throw error;
        if (todos.length > 0) {
          return todos[0];
        } else {
          throw new Error("Reminder not found");
        }
      } catch (error) {
        console.error("Error fetching task by ID:", error);
        throw error;
      }
    },

    // Update a Task by its ID
    async updateTaskById({ id, todosName, todosInfo }) {
      try {
        const { error } = await supabase
          .from("todos")
          .update({
            todosName,
            todosInfo,
          })
          .eq("id", id);
        if (error) throw error;
        await this.fetchTaskById(id);
        return true;
      } catch (error) {
        console.error("Error updating task:", error);
        throw error;
      }
    },

    // Delete a Task by its ID
    async deleteTaskById(todoId) {
      try {
        const { error } = await supabase
          .from("todos")
          .delete()
          .eq("id", todoId);
        if (error) throw error;
        return true;
      } catch (error) {
        console.error("Error deleting task:", error);
        throw error;
      }
    },

    // Create a new Task
    async createTask({ todosName, todosType, todosInfo }) {
      try {
        const userStore = useUserStore();
        const user = userStore.user;
        if (!user) {
          throw new Error("User not logged in.");
        }
        const { data, error } = await supabase.from("todos").insert([
          {
            todosName,
            todosType,
            todosInfo,
            user_id: user.id,
            backgroundColor: getRandomColor(),
          },
        ]);
        if (error) throw error;
        return data;
      } catch (error) {
        console.error("Error creating task:", error);
        throw error;
      }
    },
  },
  getters: {
    isLoggedIn: () => {
      const userStore = useUserStore();
      return userStore.isLoggedIn;
    },
  },
});

// Generating bg color for each created task and store it in the database of supabase
function getRandomColor() {
  return "hsl(" + Math.random() * 360 + ", 100%, 75%)";
}
