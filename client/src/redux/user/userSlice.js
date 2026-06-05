import { createSlice } from "@reduxjs/toolkit";
import SignIn from "../../pages/Signin";

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        SignInStart: (state) => {
            state.loading = true;
        },
        SignInSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.error = null;
        },
        SignInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const { SignInStart, SignInSuccess, SignInFailure } = userSlice.actions;
export default userSlice.reducer;