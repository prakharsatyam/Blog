import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import appwriteService from "../appwrite/config";

// Cache freshness duration: 5 minutes (in milliseconds)
const CACHE_STALE_TIME = 5 * 60 * 1000;

export const fetchPosts = createAsyncThunk(
  "blog/fetchPosts",
  async (forceRefresh = false, { getState, rejectWithValue }) => {
    const { blog } = getState();

    // If cache exists and is not stale, skip fetching (unless forceRefresh is true)
    if (
      !forceRefresh &&
      blog.posts &&
      blog.lastFetched &&
      Date.now() - blog.lastFetched < CACHE_STALE_TIME
    ) {
      return { posts: blog.posts, fromCache: true };
    }

    try {
      const response = await appwriteService.getPosts();
      if (response && response.documents) {
        return { posts: response.documents, fromCache: false };
      }
      return rejectWithValue("Failed to fetch posts from server");
    } catch (error) {
      return rejectWithValue(error.message || "An error occurred while fetching posts");
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    posts: null,
    lastFetched: null,
    loading: false,
    error: null,
  },
  reducers: {
    invalidateCache: (state) => {
      state.posts = null;
      state.lastFetched = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        if (!action.payload.fromCache) {
          state.posts = action.payload.posts;
          state.lastFetched = Date.now();
        }
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load posts";
      });
  },
});

export const { invalidateCache } = blogSlice.actions;
export default blogSlice.reducer;
