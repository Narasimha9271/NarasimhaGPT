import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {},

  reducers: {
    cacheResults: (state, action) => {
      state = Object.assign(state, action.payload);
    },
  },
});

export const { cacheResults } = searchSlice.actions;

export default searchSlice.reducer;

/**
 * what datastructure u use to perform cache?
 *
 * Time COmplexity to search in array: O(N)
 * Time COmplexity to search in Object: O(1) => We use this
 */
