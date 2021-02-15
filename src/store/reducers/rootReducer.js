import authReducer from "./authReducer"
import tempReducer from "./tempReducer"

import {combineReducers} from "redux"

const rootReducer = combineReducers({
    auth: authReducer,
    temp: tempReducer
})

export default rootReducer