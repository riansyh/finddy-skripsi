import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: "",
    imgUrl: "",
    perguruanTinggi: "",
    kabupaten: "",
    provinsi: "",
    kontak: "",
    bidangMinat: [],
    pref: [0, 0, 0, 0],
};

const registerSlice = createSlice({
    name: "register",
    initialState: initialState,
    reducers: {
        change: (state, action) => {
            state[action.payload.name] = action.payload.value;
        },
        changePref: (state, action) => {
            state.pref[action.payload.index] = action.payload.value;
        },
        addBidang: (state, action) => {
            let stop = false;
            state.bidangMinat.forEach((bidang) => {
                if (bidang.id == action.payload.id) stop = true;
            });

            if (!stop) state.bidangMinat.push(action.payload);
        },
        removeBidang: (state, action) => {
            state.bidangMinat = state.bidangMinat.filter((bidang) => bidang.id !== action.payload);
        },
        changeBidangSkill: (state, action) => {
            state.bidangMinat[action.payload.index].skill = action.payload.value;
        },
    },
});

export default registerSlice.reducer;
export const { change, changePref, addBidang, removeBidang, changeBidangSkill } =
    registerSlice.actions;
