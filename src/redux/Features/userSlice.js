import {createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name:"user",
    initialState:{
        email:null,
    },
    reducers:{
        login: (state, action) => {
            state.user.email = action.payload.email
        },
        logout: (state) => {
            state.user = null
        }
    }
})

export const {login, logout} = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;