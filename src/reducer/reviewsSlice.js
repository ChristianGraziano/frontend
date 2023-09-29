import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const endpoint = process.env.REACT_APP_SERVER_BASE_URL;

const initialState = {
  reviewsArray: [],
  reviewsArrayByAssociation: [],
  status: "idle",
  singleReviews: {},
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Chiamata GET per vedere tutti i Commenti
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviewsArray = action.payload;
        state.status = "success";
      })
      .addCase(fetchReviews.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.status = "error";
      })
      //Chiamata GET by PostID
      .addCase(fetchReviewsByAssociation.fulfilled, (state, action) => {
        state.reviewsArrayByAssociation = action.payload;
        state.status = "success";
      })
      .addCase(fetchReviewsByAssociation.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchReviewsByAssociation.rejected, (state, action) => {
        state.status = "error";
      })
      //Chiamata POST per creare un nuovo commento
      .addCase(createReviews.fulfilled, (state, action) => {
        state.reviewsArray.push(action.payload);
        state.status = "idle";
      })
      .addCase(createReviews.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(createReviews.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

//Chiamata GET per vere tutte le recensioni
export const fetchReviews = createAsyncThunk("reviews/GET", async () => {
  try {
    const res = await axios.get(`${endpoint}/reviews`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

//Chiamata GET per avere le recensioni del relativo association ID
export const fetchReviewsByAssociation = createAsyncThunk(
  "fetchReviewsByAssociation/GET",
  async (associationId) => {
    try {
      const res = await axios.get(
        `${endpoint}/reviews/association/${associationId}`
      );
      return res.data;
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }
);

//Chiamata POST per creare una recensione
export const createReviews = createAsyncThunk(
  "createReviews/POST",
  async (reviewsPayload) => {
    const data = new FormData();
    data.append("userName", reviewsPayload.userName);
    data.append("associationId", reviewsPayload.associationId);
    data.append("content", reviewsPayload.content);
    data.append("rating", reviewsPayload.rating);
    try {
      const res = await axios.post(
        `${endpoint}/reviews/create`,
        reviewsPayload
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const associationsReviews = (state) =>
  state.reviews.reviewsArrayByAssociation;
export default reviewsSlice.reducer;
