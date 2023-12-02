import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

export const getCategories = createAsyncThunk("get/categories", async (_, thunkApi) => {
    try {
        const response = await axios.get("https://653fb19b9e8bd3be29e10e51.mockapi.io/categories")
        return response.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const getCategoryById = createAsyncThunk("get/categoryById", async (id: string, thunkApi) => {
    try {
        const response = await axios.get(`https://653fb19b9e8bd3be29e10e51.mockapi.io/categories/${id}`)
        return response.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})