// import authReducer from "./authReducer"
// import tempReducer from "./tempReducer"

// import {combineReducers} from "redux"

// const rootReducer = combineReducers({
//     auth: authReducer,
//     temp: tempReducer
// })

// export default rootReducer

import {combineReducers} from "redux";

const LOGIN_USER = 'LOGIN_USER'

export function loginUser(user) {
    return {
        type: 'LOGIN_USER',
        user
    }
}

const defaultUser = 
    {
        email: null
    }


function users(state=defaultUser, action){
    switch (action.type) {
        case LOGIN_USER:
            return {email: action.payload}
            
        default:
            return state;
    }
}

const userApp = combineReducers({
    users
})

export default userApp;
