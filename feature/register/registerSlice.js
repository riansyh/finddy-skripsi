import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: "",
    imgUrl: "",
    perguruanTinggi: "",
    lokasi: "",
    kontak: "",
    bidangMinat: [],
    pref: [],
};

const registerSlice = createSlice({
    name: "register",
    initialState: initialState,
    reducers: {
        change: (state, action) => {
            state[action.payload.name] = action.payload.value;
        },
        addBidang: (state, action) => {
            state.bidangMinat.push(action.payload);
        },
        removeBidang: (state, action) => {
            //butuh id buat ngeremove
            state.bidangMinat = state.bidangMinat.filter((bidang) => bidang.id !== action.payload);
        },
        changeBidangSkill: (state, action) => {
            state.bidangMinat[action.payload.index].skill = action.payload.index;
        },
    },
});

export default registerSlice.reducer;
export const { change, addBidang, removeBidang, changeBidangSkill } = registerSlice.actions;
