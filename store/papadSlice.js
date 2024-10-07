// redux/papadSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  papads: [],
  loading: false,
  error: null,
};

// Async thunk for fetching papads
export const fetchPapads = createAsyncThunk('papads/fetchPapads', async () => {
  const response = await axios.get('http://localhost:5000/papads'); // Update with your server URL
  return response.data;
});

// Async thunk for creating a new papad
export const createPapad = createAsyncThunk('papads/createPapad', async (papadData) => {
  const response = await axios.post('http://localhost:5000/papads', papadData); // Adjust the URL
  return response.data;
});

// Async thunk for updating a papad
export const updatePapad = createAsyncThunk('papads/updatePapad', async ({ id, papadData }) => {
  const response = await axios.put(`http://localhost:5000/papads/${id}`, papadData); // Adjust the URL
  return response.data;
});

// Async thunk for deleting a papad
export const deletePapad = createAsyncThunk('papads/deletePapad', async (id) => {
  await axios.delete(`http://localhost:5000/papads/${id}`); // Adjust the URL
  return id; // Return the id to remove it from the state
});

const papadSlice = createSlice({
  name: 'papads',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchPapads.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPapads.fulfilled, (state, action) => {
        state.loading = false;
        state.papads = action.payload;
      })
      .addCase(fetchPapads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createPapad.fulfilled, (state, action) => {
        state.papads.push(action.payload);
      })
      .addCase(updatePapad.fulfilled, (state, action) => {
        const index = state.papads.findIndex((papad) => papad.productId === action.payload.productId);
        if (index !== -1) {
          state.papads[index] = action.payload;
        }
      })
      .addCase(deletePapad.fulfilled, (state, action) => {
        state.papads = state.papads.filter((papad) => papad.productId !== action.payload);
      });
  },
});

export default papadSlice.reducer;
