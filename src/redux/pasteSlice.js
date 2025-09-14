import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};

export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    // Add a new paste
    addToPastes: (state, action) => {
      state.pastes.push(action.payload);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
    },

    // Update an existing paste by _id
    updateToPastes: (state, action) => {
      const index = state.pastes.findIndex((p) => p._id === action.payload._id);
      if (index !== -1) {
        state.pastes[index] = action.payload;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
      }
    },

    // Remove a paste by _id
    removeFromPastes: (state, action) => {
      state.pastes = state.pastes.filter((p) => p._id !== action.payload);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
    },

    // Reset all pastes
    resetAllPastes: (state) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
    },
  },
});

// Export actions
export const { addToPastes, updateToPastes, removeFromPastes, resetAllPastes } =
  pasteSlice.actions;

// Export reducer
export default pasteSlice.reducer;
