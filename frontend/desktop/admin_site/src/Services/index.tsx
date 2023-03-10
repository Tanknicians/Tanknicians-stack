import { createSlice } from "@reduxjs/toolkit";

// Temporary for testing
// Will be in .ENV 
export const url = 'http://localhost:5000';

const initialState = {
    user: null,
    token: null,
    posts: [],
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLogin : (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout : (state) => {
            state.user = null;
            state.token = null;
        },
    }
})

export const {setLogin, setLogout} = authSlice.actions;
export default authSlice.reducer;