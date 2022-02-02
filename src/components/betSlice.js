import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    userData: {
        userID: ''
    }
};

export const betSlice = createSlice({
    name: 'bet',
    initialState,
    reducers: {
        setUserID: (state, action) => {
            state.userData.userID = action.payload;
        },
        reset: (state) => {
            state = initialState
        }
    }
});

export const { setUserID, reset } = betSlice.actions;

export default betSlice.reducer;