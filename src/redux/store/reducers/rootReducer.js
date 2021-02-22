
import {combineReducers} from "redux";

const LOGIN_USER = 'LOGIN_USER'
const LOGOUT_USER = 'LOGOUT_USER'
const UPDATE_USER_JOBS = 'UPDATE_USER_JOBS'

export function updateUser(jobs) {
    return {
        type: 'UPDATE_USER_JOBS',
        jobs
    }
}

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
        email: null,
        username: null,
        jobs: []
    }


function users(state=defaultUser, action){
    switch (action.type) {
        case LOGIN_USER:
            return {
                email: action.payload.email,
                username: action.payload.username,
                jobs: action.payload.jobs
            }
        case LOGOUT_USER:
            return {
                email: null,
                username: null,
                jobs: []
            }
        case UPDATE_USER_JOBS:
            return {
                ...state,
                jobs: action.payload.jobs
            }
            
        default:
            return state;
    }
}

const userApp = combineReducers({
    users
})

export default userApp;
