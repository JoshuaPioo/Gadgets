import { createSlice } from "@reduxjs/toolkit";

// Safely parse user from localStorage
let savedUser = null;
try {
  const userFromStorage = localStorage.getItem("user");
  if (userFromStorage && userFromStorage !== "undefined") {
    savedUser = JSON.parse(userFromStorage);
  }
} catch (error) {
  console.error("Error parsing user from localStorage:", error);
}

const initialState = {
  user: savedUser,
  token: localStorage.getItem("token") || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
