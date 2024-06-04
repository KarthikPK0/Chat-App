import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    username: '',
    messages: [],
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    addMessage: (state, action) => {
      const { username, message, timestamp } = action.payload;
      state.messages.push({ username, message, timestamp });
    },
  },
});

export const { setUsername, addMessage } = loginSlice.actions;

export default loginSlice.reducer;