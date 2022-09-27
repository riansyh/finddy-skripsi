import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    uid: "",
    email: "",
    name: "",
};

const authUserSlice = createSlice({
    name: "authUser",
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            state.uid = action.payload.uid;
            state.email = action.payload.email;
            state.name = action.payload.name;
            state.isComplete = action.payload.data.isComplete;
            state.data = action.payload.data;
        },
        logout: (state) => {
            state.uid = null;
            state.email = null;
            state.name = null;
            state.isComplete = null;
            state.data = null;
        },
    },
});

export default authUserSlice.reducer;
export const { login, logout } = authUserSlice.actions;
