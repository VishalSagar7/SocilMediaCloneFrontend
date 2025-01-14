import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        suggestedUsers: [],
        userProfile : null
    },

    reducers: {
        setAuthuser: (state, action) => {
            state.user = action.payload;
        },
        setSuggestedUsers: (state, action) => {
            state.suggestedUsers = action.payload
        },
        setUserProfile: (state, action) => {
            state.userProfile = action.payload;
        }
    }
});

export const { setAuthuser, setSuggestedUsers, setUserProfile } = authSlice.actions; 
export default authSlice.reducer;