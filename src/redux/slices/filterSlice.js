import { createSlice } from '@reduxjs/toolkit'

  const initialState = {
    categoryId: 0,
    sort: {
      name: "популярності(за спаданням)",
      sortType: "rating",
    }
  }

  const filterSlice = createSlice({
    name: "category",
    initialState,
    reducers: {
      setCategoryId: (state, action) => {
        state.categoryId = action.payload;
      },
      setSort: (state, action) => {
        state.sort = {...action.payload};
      }
    }
  })

  export const { setCategoryId } = filterSlice.actions;
  export const { setSort } = filterSlice.actions;
  
  export default filterSlice.reducer;
