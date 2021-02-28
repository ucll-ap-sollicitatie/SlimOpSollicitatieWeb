import React, { useState } from 'react';
import {Link, useHistory} from "react-router-dom";
import {connect} from "react-redux";
import { Helmet } from 'react-helmet';
import {addJobdb4params, getJobs} from "../user/apiUser";
import '../../App.css';



function ChooseJob(props){
    const history = useHistory();
    const [jobsList, setjobs] = useState(props.jobs)
    return(
        <div className="centerPage">
            <Helmet>
                <title>SOS - Opnemen</title>
            </Helmet>
            <h1 className>Kies je job</h1>
            <p className="chooseJob">Kies een job uit de lijst hieronder. Voor deze job ga je een interview afleggen. Als je een eigen jobtitel wilt toevoegen kan je op de knop "Voeg nieuwe job toe" klikken. Op je profiel kan je kijken welke competenties bij welke jobs horen.</p>
            {
                    jobsList.map(job => { 
                        //console.log(job.titel)
                        return (
                            <div>
                                <button id={job.titel} onClick={handleClick}>{job.titel}</button>
                            </div>)
                    })
            }

            <button onClick={toggleDisplay} className="centerPage">Voeg een nieuwe job toe</button>
            <div id="addJobWrap" style={{display:"none"}}>
            <form onSubmit={handleSubmit} className="wite" className="chooseJobForm">
                        <label htmlFor="titel">Functie die je wil inoefenen</label>
                        <input type="text" placeholder="titel" id="titel" />
                        <p id="titelerror" style={{display: "none"}}>Mag niet leeg zijn</p>

                        <label htmlFor="inter">Interpersoonlijke vaardigheid</label>
                        <input type="text" placeholder="Vaardigheid" id="inter" />
                        <p id="intererror" style={{display: "none"}}>Mag niet leeg zijn</p>

                        <label htmlFor="tech">Technische vaardigheid</label>
                        <input type="text" placeholder="Vaardigheid" id="tech" />
                        <p id="techerror" style={{display: "none"}}>Mag niet leeg zijn</p>

                        <button>Voeg job toe</button>
                    </form>
            </div>
            <button onClick={updateJobs}>Refresh</button>

        </div>
    )

    async function updateJobs(){
        var jobsnew = await getJobs(props.email)
        props.updateUser(jobsnew)
        setjobs(jobsnew)
    }

    function toggleDisplay(e){
        var el = document.getElementById("addJobWrap")
        var current = el.style.display
        if(current == "none"){
            el.style.display = "block"
        }
        else{
            el.style.display = "none"
        }
        console.log(current)
    }

    async function handleSubmit(e){
        e.preventDefault();
        var titel = document.getElementById("titel").value
        var inter = document.getElementById("inter").value
        var tech = document.getElementById("tech").value
        var email = props.email
        const result = await addJobdb4params(titel, inter, tech, email)
        
        toggleDisplay()
    }

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
        jobs: state.users.jobs,
        email: state.users.email,
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        setjob: (selectedJobTitle, selectedSkills) => {
            dispatch({type: 'SET_JOB', payload: {selectedJobTitle, selectedSkills}})
        },
        updateUser: (jobs) => {
            dispatch({type: 'UPDATE_USER_JOBS', payload: {jobs}})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (ChooseJob)