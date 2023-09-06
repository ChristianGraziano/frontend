import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const endpoint = "http://localhost:5050";
console.log(endpoint);

const initialState = {
  associationsArray: [],
  association: null,
  status: "idle",
};

const associationSlice = createSlice({
  name: "associations",
  initialState,
  reducers: {
    filterAssociation: (state, action) => {
      state.associationsArray = state.associationsArray.filter(
        (association) => {
          return association.name
            .toLowerCase()
            .includes(action.payload.toLowerCase());
        }
      );
    },
  },
  extraReducers: (builder) => {
    builder
      //Chiamata POST
      .addCase(associationPost.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(associationPost.rejected, (state, action) => {
        state.status = "error";
      })
      .addCase(associationPost.pending, (state, action) => {
        state.status = "pending";
      })

      //Chiamata GET
      .addCase(getAssociations.fulfilled, (state, action) => {
        state.assocaitionsArray = action.payload;
      })
      .addCase(getAssociations.rejected, (state, action) => {
        state.status = "error";
      })
      .addCase(getAssociations.pending, (state, action) => {
        state.status = "pending";
      })

      //Chiamata DELETE
      .addCase(deleteAssociation.fulfilled, (state, action) => {
        state.associationsArray = state.associationsArray.filter(
          (association) => association._id !== action.payload
        );
      });
  },
});

export const associationPost = createAsyncThunk(
  "association/register",
  async (association) => {
    const form = new FormData();
    form.append("name", association.name);
    form.append("region", association.region);
    form.append("address", association.address);
    form.append("password", association.password);
    form.append("email", association.email);
    form.append("logo", association.logo);
    form.append("descriptio", association.description);
    form.append("pIva", association.pIva);

    try {
      const res = await axios.post(
        ` ${endpoint}/register/associations/`,
        form,
        {
          Headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAssociations = createAsyncThunk(
  "associations/Get",
  async () => {
    try {
      const res = await axios.get(`${endpoint}/associations`);
      if (!res) {
        console.log(`HTTP error! status: ${res.status}`);
      }
      console.log(res.data.users);
      return res.data.users;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const deleteAssociation = createAsyncThunk(
  "associations/Delete",
  async (associationId) => {
    try {
      const res = await axios.delete(`${endpoint}/authors/${associationId}`);
      return res.data.associations;
      console.log(res.data.associations);
    } catch (error) {
      console.log(error);
    }
  }
);

export const { filterAssociation } = associationSlice.actions;
export default associationSlice.reducer;
