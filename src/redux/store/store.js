import { configureStore } from '@reduxjs/toolkit';

import {login, logout, userSlice} from '../Features/userSlice'

export default configureStore({
    reducer:{
        login : userSlice.reducer ,
    },
})