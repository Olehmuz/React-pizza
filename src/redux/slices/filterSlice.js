import { createSlice } from '@reduxjs/toolkit'

  const initialState = {
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
      }
    }
  })

  export const { setCategoryId, setSort, setCurrentPage } = filterSlice.actions;
  
  export default filterSlice.reducer;
