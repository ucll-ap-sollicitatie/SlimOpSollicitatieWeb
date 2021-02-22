import React, { useState } from 'react';
import {Link, useHistory} from "react-router-dom";
import {connect} from "react-redux";


function ChooseJob(props){

    const history = useHistory();

    return(
        <div>
            <h1>Choose your job</h1>
            <p>You can add more jobs in your profile</p>

            {
                    props.jobs.map(job => { 
                        //console.log(job.titel)
                        return (
                            <div>
                                <button id={job.titel} onClick={handleClick}>{job.titel}</button>
                            </div>)
                    })
                }
        </div>
    )

    function handleClick(e){
        var jobtitle = e.target.id
        var skills = []
        props.jobs.forEach(job => {
            if(job.titel == jobtitle){
                skills = [job.inter, job.tech, job.tech2]
            }
        });
        props.setjob(jobtitle, skills)
        history.push("/camera")
    }
}

const mapStateToProps = (state) => {
    return{
        jobs: state.users.jobs
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        setjob: (selectedJobTitle, selectedSkills) => {
            dispatch({type: 'SET_JOB', payload: {selectedJobTitle, selectedSkills}})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (ChooseJob)