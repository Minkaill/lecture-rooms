import { LectureDTO } from "@/models/lectures";
import { createSlice } from "@reduxjs/toolkit";
import { addLectures, getLectures, onPostMockUrl } from "../features/lecture";
import { RootState } from "../store";

interface LectureState {
    lectures: LectureDTO[],
    isLoading: boolean,
    error: null | string
    progressData: null | {
        loaded: number;
        total: number;
        percentCompleted: number;
    };
}

const initialState: LectureState = {
    lectures: [],
    isLoading: false,
    error: null,
    progressData: null
}

export const lectureSlice = createSlice({
    name: "lecture",
    initialState,
    reducers: {
        setProgressData: (state, action) => {
            state.progressData = {
                loaded: action.payload.loaded,
                total: action.payload.total,
                percentCompleted: (action.payload.loaded / action.payload.total) * 100,
            };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getLectures.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(getLectures.fulfilled, (state, action: any) => {
                state.lectures = action.payload,
                    state.isLoading = false,
                    state.error = null
            })
            .addCase(getLectures.rejected, (state, action: any) => {
                state.error = action.payload,
                    state.isLoading = true
            })

            .addCase(addLectures.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(addLectures.rejected, (state, action: any) => {
                state.error = action.payload,
                    state.isLoading = true
            })

            .addCase(onPostMockUrl.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(onPostMockUrl.rejected, (state, action: any) => {
                state.error = action.payload,
                    state.isLoading = true
            })
    }
})

export const { setProgressData } = lectureSlice.actions

export default lectureSlice.reducer
export const selectLectures = (state: RootState) => state.lectures