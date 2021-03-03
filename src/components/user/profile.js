import React, { useState,useEffect  } from 'react';
import {Link, useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {deleteJobdb,getJobs} from "./apiUser";
import { Helmet } from 'react-helmet';



function Profile(props){
    
    const history = useHistory();
    const [jobs, setJobs] = useState(props.jobs);
    var email = ""
    var name = ""
    if(props.email != null){
        email = props.email
        //console.log(jobs)
       }

    if(props.name != null){
        name = props.name
    }

    

    //console.log(props.email)
    return (
        
    <div className="centerPage">
    <Helmet>
        <title>SOS - Profiel</title>
    </Helmet>

    <div className="containter profilePage">

            <div className="profileRight">
            <img src="https://via.placeholder.com/150" alt="Profile Pic" style={imgstyle}/>
            <section>
                <p>{email}</p>
                <p>{name}</p>
                <Link to="/updateUsername">
                    <button style={buttonStyle}>Wijzig Gebruikersnaam</button>
                </Link>
            </section>
            </div>
            <section className="profileLeft">
                 {
                    jobs.map(job => { 
                        //console.log(job.titel)
                        return (
                            <div className="profilePadding">
                                <h4>{job.titel}</h4>
                                <h5>Skills:</h5>
                                <ul>
                                    <li>{job.inter}</li>
                                    <li>{job.tech}</li>
                                    <button style={buttonStyle} id={job.titel} onClick={deleteJob}>Verwijder Job</button>
                                </ul>
                            </div>)
                    })
                }
                
                <Link to="/addJob">
                    <button style={buttonStyle}>Nieuwe Jobtitel</button>
                </Link>
                <button onClick={updateJobs} hidden>Refresh</button>

            </section>


        </div>
    </div>
    );


    async function updateJobs(){
        var jobsnew = await getJobs(props.email)
        console.log(jobsnew)
        props.updateUser(jobsnew)
        setJobs(jobsnew)
        history.push("/profile");

    }

    async function deleteJob(e) {
        e.preventDefault();
        const result = await deleteJobdb(e.target.id, props.email)
        //console.log(result === true)
        if(result === true){
            updateJobs()
            history.push("/profile");
        }
    }
}

const imgstyle = {
    margin: 15
}

const buttonStyle = {
    margin: 7
}



const mapStateToProps = (state) => {
    return{
        email: state.users.email,
        name: state.users.username,
        jobs: state.users.jobs
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        updateUser: (jobs) => {
            dispatch({type: 'UPDATE_USER_JOBS', payload: {jobs}})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Profile);
