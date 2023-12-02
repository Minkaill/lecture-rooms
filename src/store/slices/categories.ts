import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getCategories, getCategoryById } from "../features/categories";
import { CategoryDTO, ICategories } from "@/models/categories";
import { RootState } from "../store";

interface CategoriesState {
    categories: CategoryDTO[],
    selectedCategory: CategoryDTO | null;
    isLoading: boolean,
    error: null | ""
}

const initialState: CategoriesState = {
    categories: [],
    isLoading: false,
    selectedCategory: null,
    error: null
}

export const categoriesSlice = createSlice({
    name: "lecture",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state) => {
                state.categories = []
                state.error = null
                state.isLoading = true
            })
            .addCase(getCategories.fulfilled, (state, action: any) => {
                state.isLoading = false
                state.categories = action.payload
                state.error = null
            })
            .addCase(getCategories.rejected, (state, action: any) => {
                state.error = action.payload
                state.isLoading = true
                state.categories = []
            })

            .addCase(getCategoryById.pending, (state) => {
                state.error = null
                state.isLoading = true
            })
            .addCase(getCategoryById.fulfilled, (state, action: any) => {
                state.isLoading = false
                state.selectedCategory = action.payload
                state.error = null
            })
            .addCase(getCategoryById.rejected, (state, action: any) => {
                state.error = action.payload
                state.isLoading = true
            })
    }
})

export default categoriesSlice.reducer

export const selectCategories = (state: RootState) => state.categories