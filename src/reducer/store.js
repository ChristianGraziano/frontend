import { configureStore } from "@reduxjs/toolkit";
import associationSlice from "./associationSlice";
import postSlice from "./postSlice";
import reviewsSlice from "./reviewsSlice";
import requestAdoptionSlice from "./requestAdoptionSlice";

const store = configureStore({
  reducer: {
    associations: associationSlice,
    adoptionPosts: postSlice,
    reviews: reviewsSlice,
    requestAdoption: requestAdoptionSlice,
  },
});

export default store;
