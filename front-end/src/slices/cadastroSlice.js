import { createSlice } from '@reduxjs/toolkit';

const cadastroSlice = createSlice({
  name: 'cadastro',
  initialState: {
    user: null,
  },
  reducers: {
    saveUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { saveUser } = cadastroSlice.actions;
export default cadastroSlice.reducer;
