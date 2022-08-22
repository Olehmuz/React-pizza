import { RootState } from './../store';
import { createSlice } from '@reduxjs/toolkit'

  type Sort = {
    name: string;
    sortType: "rating" | "price" | "title" | "-rating" | "-price" | "-title";
  }
  interface FilterSliceState {
    categoryId: number;
    currentPage: number
    sort: Sort;
  }
  const initialState: FilterSliceState = {
    categoryId: 0,
    currentPage: 0,
    sort: {
      name: "популярності(за спаданням)",
      sortType: "rating",
    },
  };

  const filterSlice = createSlice({
    name: "category",
    initialState,
    reducers: {
      setCategoryId: (state, action) => {
        state.categoryId = action.payload;
      },
      setSort: (state, action) => {
        state.sort = {...action.payload};
      },
      setCurrentPage: (state, action) => {
        state.currentPage = action.payload;
      },
      setFilters: (state, action) => {
        if (Object.keys(action.payload).length) {
          state.currentPage = Number(action.payload.currentPage);
          state.categoryId = Number(action.payload.categoryId);
          state.sort = action.payload.sort;
        } else {
          state.currentPage = 1;
          state.categoryId = 0;
          state.sort = {
            name: 'популярности',
            sortType: 'rating',
          };
        }
      }
    }
  })

  export const selectFilter = (state: RootState) => state.filterSlice;

  export const { setCategoryId, setSort, setCurrentPage, setFilters } = filterSlice.actions;
  
  export default filterSlice.reducer;
