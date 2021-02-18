
import {combineReducers} from "redux";

const LOGIN_USER = 'LOGIN_USER'
const LOGOUT_USER = 'LOGOUT_USER'

export function loginUser(user) {
    return {
        type: 'LOGIN_USER',
        user
    }
}

export function logoutUser() {
    return {
        type: 'LOGOUT_USER'
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
        case LOGOUT_USER:
            return {email: null}
            
        default:
            return state;
    }
}

const userApp = combineReducers({
    users
})

export default userApp;
