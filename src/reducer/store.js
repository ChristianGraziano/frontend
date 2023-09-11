import { configureStore } from "@reduxjs/toolkit";
import associationSlice from "./associationSlice";
import postSlice from "./postSlice";

const store = configureStore({
  reducer: {
    associations: associationSlice,
    adoptionPosts: postSlice,
  },
});

export default store;
