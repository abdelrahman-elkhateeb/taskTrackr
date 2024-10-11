import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchKeyword: "",
  tasks: [],
  filteredTasks: [],
  filtrationPriorities: [],
};

const searchTasksReducer = createSlice({
  name: "searchTasks",
  initialState,
  reducers: {
    setSearchKeyword: (state, action) => {
      state.searchKeyword = action.payload;
    },
    searchTasks: (state, action) => {
      state.searchKeyword = action.payload;
      state.filteredTasks = state.tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(action.payload.toLowerCase()) ||
          task.description.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    updateFilteredTasks: (state) => {
      state.filteredTasks = state.tasks.filter((task) => {
        const matchesKeyword = state.searchKeyword
          ? task.title
              .toLowerCase()
              .includes(state.searchKeyword.toLowerCase()) ||
            task.description
              .toLowerCase()
              .includes(state.searchKeyword.toLowerCase())
          : true;
        const matchesPriority =
          state.filtrationPriorities.length === 0 ||
          state.filtrationPriorities.includes(task.priority);

        return matchesKeyword && matchesPriority;
      });
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;
      state.filteredTasks = action.payload;
    },
    setFiltrationPriorities: (state, action) => {
      state.filtrationPriorities = action.payload;
    },
    togglePriority: (state, action) => {
      const priority = action.payload;
      if (state.filtrationPriorities.includes(priority)) {
        state.filtrationPriorities = state.filtrationPriorities.filter(
          (p) => p !== priority
        );
      } else {
        state.filtrationPriorities.push(priority);
      }
    },
  },
});

export const {
  setSearchKeyword,
  setTasks,
  updateFilteredTasks,
  searchTasks,
  setFiltrationPriorities,
  togglePriority,
} = searchTasksReducer.actions;

export default searchTasksReducer.reducer;
