import React, { useState } from 'react';
import {Link, useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {deleteJobdb,getJobs} from "./apiUser";



function Profile(props){
    
    const history = useHistory();
    const [jobs, setJobs] = useState(props.jobs);
    var email = ""
    if(props.email != null){
        email = props.email
        console.log(jobs)
    }
    

    console.log(props.email)
    return (
    <div className="centerPage">
    <div className="containter profilePage">
        <section>
            <div className="profileRight">
            <img src="https://via.placeholder.com/150" alt="Profile Pic" style={imgstyle}/>
            <section>
                <p>{email}</p>
                <Link to="/updateUsername">
                    <button style={buttonStyle}>Wijzig Gebruikersnaam</button>
                </Link>


            </section>
            </div>
            <section>
                 {
                    jobs.map(job => { 
                        console.log(job.titel)
                        return (
                            <div>
                                <h4>{job.titel}</h4>
                                <h5>skills:</h5>
                                <ul>
                                    <li>{job.inter}</li>
                                    <li>{job.tech}</li>
                                    <li>{job.tech2}</li>
                                    <button style={buttonStyle} id={job.titel} onClick={deleteJob}>Verwijder Job</button>
                                </ul>

                            </div>)
                    })
                }
                       
                
                 
                <Link to="/addJob">
                    <button style={buttonStyle}>Add job</button>
                </Link>
                <button onClick={updateJobs}>Refresh</button>

            </section>
        </section>

        </div>
    </div>
    );


    async function updateJobs(){
        var jobsnew = await getJobs(props.email)
        console.log("jobsnew:")
        console.log(jobsnew)
        props.updateUser(jobsnew)
        setJobs(jobsnew)
    }

    //er zijn volgens mij nog ergens await problemen bij de getJobs
    async function deleteJob(e) {
        e.preventDefault();
        const result = await deleteJobdb(e.target.id, props.email)
        console.log(result === true)
        if(result === true){
            var jobsnew = await getJobs(props.email)
            console.log("jobsnew:")
            console.log(jobsnew)
            props.updateUser(jobsnew)
            setJobs(jobsnew)
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
