import { configureStore } from "@reduxjs/toolkit";
import associationSlice from "./associationSlice";
import postSlice from "./postSlice";
import reviewsSlice from "./reviewsSlice";

const store = configureStore({
  reducer: {
    associations: associationSlice,
    adoptionPosts: postSlice,
    reviews: reviewsSlice,
  },
});

export default store;
