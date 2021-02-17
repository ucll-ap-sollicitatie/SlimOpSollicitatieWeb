import { configureStore } from '@reduxjs/toolkit';

import userSlice from '../Features/userSlice'

export default configureStore({
    reducer:{
        userSlice : userSlice,
    },
})