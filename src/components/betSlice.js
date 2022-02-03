import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    userData: {
        userID: '',
        email: '',
        name: '',
        betData: {
            currentBet: [],
            betHistory: []
        }
    },
    fixture: [{success: false}, {success: false} ]
};

export const betSlice = createSlice({
    name: 'bet',
    initialState,
    reducers: {
        setUserID: (state, action) => {
            state.userData.userID = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        updateUserData: (state, action) => {
            state.userData = action.payload;
        },
        updateFixture: (state, action) => {
            state.fixture = action.payload;
        },
        reset: (state) => {
            state = initialState;
        }
    }
});

export const { setUserID, reset, setLoading, updateUserData, updateFixture } = betSlice.actions;

export default betSlice.reducer;