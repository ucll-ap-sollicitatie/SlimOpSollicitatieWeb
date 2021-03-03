import React, {Component, useState} from 'react';
import {useHistory} from "react-router-dom";
import {addJobdb, getJobs,addJobdb4params} from "./apiUser";
import {connect} from "react-redux";
import {useDispatch} from 'react-redux'
import { Helmet } from 'react-helmet';


function AddJob(props){
    const history = useHistory();
    const dispatch = useDispatch();

    const [titel, setTitel] = useState('');
    const [inter, setInter] = useState('');
    const [tech, setTech] = useState('');
    const [email, setEmail] = useState(props.email);


        return (
            <div className="centerPage">
            <Helmet>
                <title>SOS - Nieuwe Job</title>
            </Helmet>

                <div>
                    <h1>Maak een nieuwe job aan</h1>
                    <form onSubmit={handleSubmit} className="wite" className="chooseJobForm">
                        <label htmlFor="titel">De functie waarvoor ik ga solliciteren is</label>
                        <input type="text" placeholder="Titel" id="titel" onChange={(e) =>setTitel(e.target.value)}/>
                        <p id="titelerror" style={{display: "none"}}>Mag niet leeg zijn</p>

                        <p hidden>Als je solliciteert dan vraagt een organisatie dat je bepaalde vaardigheden bezit. Dit kunnen
                        Technische vaardigheid zijn: zoals programmeren, onderwijzen, 
                            koken,… of communicatievaardigheden zijn: samenwerken, klantgerichtheid, presenteren,…</p>

                        <label htmlFor="inter">communicatievaardigheden</label>
                        <input type="text" placeholder="Competentie" id="inter" onChange={(e) => setInter(e.target.value)}/>
                        <p id="intererror" style={{display: "none"}}>Mag niet leeg zijn</p>

                        <label htmlFor="tech">Technische vaardigheid</label>
                        <input type="text" placeholder="Competentie" id="tech" onChange={(e) => setTech(e.target.value)}/>
                        <p id="techerror" style={{display: "none"}}>Mag niet leeg zijn</p>

                        {/* <label htmlFor="tech2">Technische vaardigheid 2</label>
                        <input type="text" placeholder="Technische vaardigheid 2" id="tech2" onChange={(e) => setTech2(e.target.value)}/>
                        <p id="tech2error" style={{display: "none"}}>Mag niet leeg zijn</p> */}

                        <button>Voeg job toe</button>
                    </form>
                </div>
            </div>
        )

        /**
         * When a user submits the form, a new job is created in the database, and is saved in state.
         * On success: redirected to /profile
         */
    async function handleSubmit(e)
    {
        e.preventDefault();
        //check if empty
        if(ifEmpty("titel", titel) && ifEmpty("inter", inter)  && ifEmpty("tech", tech) /**&& ifEmpty("tech2", tech2)*/ ){
            //add job to db
            const result = await addJobdb4params(titel, inter, tech, email)
            if(result === true){
                //get all jobs from db
                var jobs = await getJobs(email)
                //set all jobs in db
                props.updateUser(jobs)
                //redirect to /profile
                history.push("/profile");
            }
        }   
    }

    /**
     * returns true or false based on if the field is empty.
     * If empty, display error
     */
    function ifEmpty(field, elem){
        if(elem.replace(/\s/g,'') === ""){
            var el = document.getElementById(field + "error")
            el.style.display = "block";
            return false
        }
        return true

    }

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

export default connect(mapStateToProps, mapDispatchToProps) (AddJob);
