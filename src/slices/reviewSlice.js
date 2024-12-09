import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  review: {
    rating: null,
    comment: '',
  },
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.review = initialState.review;
    },
    setRating: (state, action) => {
      state.review.rating = action.payload;
    },
    setComment: (state, action) => {
      state.review.comment = action.payload;
    },
  },
});

export const { openModal, closeModal, setRating, setComment } = reviewSlice.actions;
export default reviewSlice.reducer;
