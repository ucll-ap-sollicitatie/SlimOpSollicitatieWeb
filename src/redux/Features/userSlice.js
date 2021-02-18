import {createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name:"user",
    initialState:{
        email: null,
    },
    reducers:{
        loginUser: (state, action) => {
            return [...state, {email: action.payload}]
        },
        logout: (state) => {
            state.user = null
        }
    }
})

export const {loginUser, logout} = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;