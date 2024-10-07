// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import papadReducer from './papadSlice';
// import orderReducer from './orderSlice'; // Import the new slice for orders

const store = configureStore({
  reducer: {
    papads: papadReducer,
    //orders: orderReducer, // Add your new slice here
  },
});

export default store;
