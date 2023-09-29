import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const endpoint = process.env.REACT_APP_SERVER_BASE_URL;

const initialState = {
  requestArray: [],
  requestArrayByAssociation: [],
  status: "idle",
  singleRequest: {},
};

const requestAdoptionSlice = createSlice({
  name: "requestAdoption",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //POST PER AGGIUNGERE REQUEST
      .addCase(createRequest.fulfilled, (state, action) => {
        state.requestArray = action.payload;
        state.status = "idle";
      })
      .addCase(createRequest.pending, (state) => {
        state.status = "pending";
      })
      .addCase(createRequest.rejected, (state) => {
        state.status = "error";
      })
      // GET BY ASSOCIATION ID PER AVERE REQUEST DI ASSOCIAZIONI
      .addCase(fetchRequestByAssociation.fulfilled, (state, action) => {
        state.requestArrayByAssociation = action.payload;
        state.status = "idle";
      })
      .addCase(fetchRequestByAssociation.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchRequestByAssociation.rejected, (state) => {
        state.status = "error";
      })
      //DELETE PER CANCELLARE REQUEST
      .addCase(deleteRequestAdoption.fulfilled, (state, action) => {
        state.requestArray = state.requestArray.filter(
          (request) => request._id !== action.payload
        );
        console.log(state.requestArray);
      });
  },
});

export const createRequest = createAsyncThunk(
  "createNewRequest/POST",
  async (requestPayload) => {
    const data = new FormData();
    data.append("name", requestPayload.name);
    data.append("surname", requestPayload.surname);
    data.append("email", requestPayload.email);
    data.append("phoneNumber", requestPayload.phoneNumber);
    data.append("address", requestPayload.address);
    data.append("birthdayDate", requestPayload.birthdayDate);
    data.append("fiscalCode", requestPayload.fiscalCode);
    data.append("avatar", requestPayload.avatar);
    data.append("motivation", requestPayload.motivation);
    data.append("associationId", requestPayload.associationId);
    data.append("postId", requestPayload.postId);
    try {
      const res = await axios.post(
        `${endpoint}/requestAdoption/create`,
        requestPayload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

//Chiamata GET per avere le richieste di adozione del relativo association ID
export const fetchRequestByAssociation = createAsyncThunk(
  "requestAdoptionById/GET",
  async (associationId) => {
    try {
      const res = await axios.get(
        `${endpoint}/requestAdoption/association/${associationId}`
      );
      return res.data;
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteRequestAdoption = createAsyncThunk(
  "requestAdoption/Delete",
  async (requestId) => {
    try {
      const res = await axios.delete(
        `${endpoint}/requestAdoption/${requestId}`
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export default requestAdoptionSlice.reducer;
