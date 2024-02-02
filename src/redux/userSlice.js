import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { value: null,orders: [], isAuthenticated: false, isLoading: false },
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    clearUser: (state) => {
      state.value = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUser,setOrders, clearUser, setLoading } = userSlice.actions;

export default userSlice.reducer;
