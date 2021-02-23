
import {combineReducers} from "redux";

const LOGIN_USER = 'LOGIN_USER'
const LOGOUT_USER = 'LOGOUT_USER'
const UPDATE_USER_JOBS = 'UPDATE_USER_JOBS'
const UPDATE_USERNAME = 'UPDATE_USERNAME'

const SET_JOB = 'SET_JOB'

export function updateUser(jobs) {
    return {
        type: 'UPDATE_USER_JOBS',
        jobs
    }
}

export function updateUsername(username) {
    return {
        type: 'UPDATE_USERNAME',
        username
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


export function setjob(selectedJobTitle, selectedSkills){
    return{
        type: 'SET_JOB',
        selectedJobTitle,
        selectedSkills
    }
}

/**
 * Default values of a user that is not logged in
 */
const defaultUser = 
    {
        email: null,
        username: null,
        jobs: [],
        selectedJobTitle: "Ober",
        selectedSkills: ["Vriendelijk", "snel", "slim"]
    }

function users(state=defaultUser, action){
    switch (action.type) {
        /**
         * LOGIN USER:
         *  change the state of email, username and jobs
         */
        case LOGIN_USER:
            return {
                ...state,
                email: action.payload.email,
                username: action.payload.username,
                jobs: action.payload.jobs
            }

        /**
         * LOGOUT USER:
         *  change the state of email, username and jobs back to default
         */
        case LOGOUT_USER:
            return {
                ...state,
                email: null,
                username: null,
                jobs: [],
                selectedJobTitle: defaultUser.selectedJobTitle,
                selectedSkills: defaultUser.selectedSkills
            }

        case UPDATE_USERNAME:
            return{
                ...state,
                username: action.payload.username
            } 

        /**
         * UPDATE USER JOBS:
         *  change the jobs of a user
         */
        case UPDATE_USER_JOBS:
            return {
                //copy state
                ...state,
                //update jobs
                jobs: action.payload.jobs
            }

        case SET_JOB:
            return{
                ...state,
                selectedJobTitle: action.payload.selectedJobTitle,
                selectedSkills: action.payload.selectedSkills
            }

        default:
            return state;
    }
}

//-------------------------------------------------------------------------------------------------------------

const SET_BLOB = 'SET_BLOB'
const defaultVid =
    {
        vidblob: []
    }

export function setBlob(blob) {
    return {
        type: 'SET_BLOB',
        blob
    }
}
function vidReducer(state=defaultVid, action){
    switch (action.type) {
        case SET_BLOB:
            return{
                ...state,
                vidblob: [...state.vidblob, action.payload.vidblob]
            }

        default:
            return state
    }
}

const userApp = combineReducers({
    users,
    vidReducer
})


export default userApp;
