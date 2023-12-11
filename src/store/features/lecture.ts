import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import { setProgressData } from "../slices/lectures";

export const getLectures = createAsyncThunk("get/lectures", async (id: string, thunkApi) => {
    try {
        const response = await axios.get(`https://653fb19b9e8bd3be29e10e51.mockapi.io/categories/${id}/lectures`)
        return response.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const addLectures = createAsyncThunk("post/lectures", async (fd: any, thunkApi) => {
    try {
        const response = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDNAME}/image/upload`, fd, {
            onUploadProgress: event => {
                thunkApi.dispatch(setProgressData(event));
            }
        })
        return response
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const onPostMockUrl = createAsyncThunk("post/mock", async (data: { id: string | undefined, url: string }, thunkApi) => {
    try {
        const response = await axios.post(`https://653fb19b9e8bd3be29e10e51.mockapi.io/categories/${data.id}/lectures`, { url: data.url })
        return response
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})