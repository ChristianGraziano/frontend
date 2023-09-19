import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const endpoint = "http://localhost:5050";

const initialState = {
  postsArray: [],
  status: "idle",
  singlePost: {},
  postByIdAssociation: [],
};

const postSlice = createSlice({
  name: "adoptionPosts",
  initialState,
  reducers: {
    filterPosts: (state, action) => {
      state.postsArray = state.postsArray.filter((post) => {
        return post.location
          .toLowerCase()
          .includes(action.payload.toLowerCase());
      });
    },
  },
  extraReducers: (builder) => {
    builder
      // Chiamata POST
      .addCase(postAdoptionPosts.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(postAdoptionPosts.rejected, (state, action) => {
        state.status = "error";
      })
      .addCase(postAdoptionPosts.pending, (state, action) => {
        state.status = "pending";
      })
      //chiamata GET
      .addCase(getAdoptionPost.fulfilled, (state, action) => {
        state.postsArray = action.payload;
      })
      .addCase(getAdoptionPost.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getAdoptionPost.rejected, (state, action) => {
        state.status = "error";
      })
      //Chiamata Delete
      .addCase(deleteAdoptionPost.fulfilled, (state, action) => {
        state.postsArray = state.postsArray.filter(
          (post) => post._id !== action.payload
        );
      })
      //Chiamata per cercare un post ID
      .addCase(adoptionPostById.fulfilled, (state, action) => {
        state.singlePost = action.payload;
      })
      .addCase(adoptionPostById.pending, (state, action) => {
        state.status = "loading";
      })

      .addCase(adoptionPostById.rejected, (state, action) => {
        state.status = "error";
      })
      //chiamata GET filtro AssociationID
      .addCase(postByAssociationId.fulfilled, (state, action) => {
        state.postByIdAssociation = action.payload;
      })
      .addCase(postByAssociationId.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(postByAssociationId.rejected, (state, action) => {
        state.status = "error";
      })
      //Chiamata PATCH per modificare un post
      .addCase(patchAdoptionPost.fulfilled, (state, action) => {
        state.singlePost = action.payload;
      })
      .addCase(patchAdoptionPost.pending, (state, action) => {
        state.status = "loading";
      })

      .addCase(patchAdoptionPost.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

export const postAdoptionPosts = createAsyncThunk(
  "adoptionPost/POST",
  async (postPayload) => {
    const data = new FormData();
    data.append("typeAnimal", postPayload.typeAnimal);
    data.append("name", postPayload.name);
    data.append("age", postPayload.age);
    data.append("gender", postPayload.gender);
    data.append("dimension", postPayload.dimension);
    data.append("location", postPayload.location);
    data.append("city", postPayload.city);
    data.append("image", postPayload.image);
    data.append("association", postPayload.association);
    data.append("content", postPayload.content);
    try {
      const res = await fetch(`${endpoint}/posts/create`, {
        method: "POST",
        body: data,
      });

      const result = await res.json();
      toast.success(" Post Creato Con Successo!!👍 ", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAdoptionPost = createAsyncThunk(
  "adoptionPost/GET",
  async ({ page, pageSize }) => {
    try {
      const res = await axios.get(
        `${endpoint}/posts?page=${page}&pageSize=${pageSize}`
      );
      if (!res) {
        console.log(`HTTP error! status: ${res.status}`);
      }
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteAdoptionPost = createAsyncThunk(
  "adoptionPost/Delete",
  async (postId) => {
    try {
      const res = await axios.delete(`${endpoint}/posts/${postId}`);
      return res.data.post;
    } catch (error) {
      console.log(error);
    }
  }
);

export const adoptionPostById = createAsyncThunk(
  "adoptionPosts/getById",
  async (id) => {
    try {
      const res = await axios.get(`${endpoint}/posts/${id}`);
      if (!res) {
        console.log(`HTTP error! status: ${res.status}`);
      }
      console.log("API POST ID", res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

//Chiamata per cercare i post in base all'associazione creatrice
export const postByAssociationId = createAsyncThunk(
  "postByAssociation/GET",
  async (AssociationId) => {
    try {
      const res = await axios.get(
        `${endpoint}/posts/association/${AssociationId}`
      );
      if (!res) {
        console.log(`HTTP error! status: ${res.status}`);
      }
      console.log(res.data.post);
      return res.data.post;
    } catch (error) {
      console.log(error);
    }
  }
);

//Chiamata PATCH per modificare un post
export const patchAdoptionPost = createAsyncThunk(
  "adoptionPost/PATCH",
  async ({ postId, dataToUpdate }) => {
    try {
      const res = await axios.patch(
        `${endpoint}/posts/change/${postId}`,
        dataToUpdate
      );
      return res.data.post;
      console.log(res.data.post);
    } catch (error) {
      console.log(error);
    }
  }
);

export const { filterPosts } = postSlice.actions;
export default postSlice.reducer;
