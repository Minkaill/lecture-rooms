import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

export const getLectures = createAsyncThunk("get/categories", async (id: string, thunkApi) => {
    try {
        const response = await axios.get(`https://653fb19b9e8bd3be29e10e51.mockapi.io/categories/${id}/lectures`)
        return response.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})