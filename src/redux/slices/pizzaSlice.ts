import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
type Pizza = {
  id: string;
  title: string;
  imageUrl: string;
  types: [];
  sizes: [];
  price: number;
  category: number;
  rating: number;
};
interface PizzaSliceStack {
  items: Pizza[];
  loadingStatus: 'loading' | 'succsess' | 'error';
  searchValue: string;
}

const initialState = {
  items: [],
  loadingStatus: 'loading',
  searchValue: ''
};

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzaStatus',
  async ({category, page, sortBy, order, search}) => {
    const { data } = await axios.get(
      `https://62c5bbc4a361f725128d123e.mockapi.io/items?${category}${page}${sortBy}${order}${search}`
    )
    return data;
  }
)

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    addPizzas: (state, action) => {
      state.items = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    }
  },
  extraReducers: {
    [fetchPizzas.pending]: (state, action) => {
      state.items = [];
      state.loadingStatus = 'loading';
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.loadingStatus = 'succsess';
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.items = [];
      state.loadingStatus = 'error';
    }
  }
});

export const selectPizza = (state) => state.pizzaSlice;

export const { addPizzas, setSearchValue } = pizzaSlice.actions;

export default pizzaSlice.reducer;
