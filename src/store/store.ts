import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import lectureSlice from './slices/lectures';
import categoriesSlice from "./slices/categories";


export const store = configureStore({
    reducer: {
        categories: categoriesSlice,
        lectures: lectureSlice
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;