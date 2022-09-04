import { RootState } from "./../store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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

enum Status {
  LOADING = "loading",
  SUCCESS = "succsess",
  ERROR = "error",
}

interface PizzaSliceStack {
  items: Pizza[];
  loadingStatus: Status;
  searchValue: string;
}

const initialState: PizzaSliceStack = {
  items: [],
  loadingStatus: Status.LOADING,
  searchValue: "",
};

export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>(
  "pizza/fetchPizzaStatus",
  async ({ category, page, sortBy, order, search }) => {
    const { data } = await axios.get(
      `https://62c5bbc4a361f725128d123e.mockapi.io/items?${category}${page}${sortBy}${order}${search}`
    );
    return data;
  }
);

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    addPizzas: (state, action) => {
      state.items = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.items = [];
      state.loadingStatus = Status.LOADING;
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loadingStatus = Status.SUCCESS;
    });

    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.items = [];
      state.loadingStatus = Status.ERROR;
    });
  }
});

export const selectPizza = (state: RootState) => state.pizzaSlice;

export const { addPizzas, setSearchValue } = pizzaSlice.actions;

export default pizzaSlice.reducer;
