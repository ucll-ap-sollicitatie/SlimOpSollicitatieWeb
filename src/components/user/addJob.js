import React, {Component, useState} from 'react';
import {useHistory} from "react-router-dom";
import {addJobdb, getJobs} from "./apiUser";
import {connect} from "react-redux";
import {useDispatch} from 'react-redux'


function AddJob(props){
    const history = useHistory();
    const dispatch = useDispatch();

    const [titel, setTitel] = useState('');
    const [inter, setInter] = useState('');
    const [tech, setTech] = useState('');
    const [tech2, setTech2] = useState('');
    const [email, setEmail] = useState(props.email);


        return (
            <div className="centerPage">
                <div>
                    <h1>Maak een nieuwe job aan</h1>
                    <form onSubmit={handleSubmit} className="wite">
                        <label htmlFor="titel">Functie die je wil inoefenen</label>
                        <input type="text" placeholder="titel" id="titel" onChange={(e) =>setTitel(e.target.value)}/>

                        <label htmlFor="inter">Interpersoonlijke vaardigheid</label>
                        <input type="text" placeholder="inter" id="inter" onChange={(e) => setInter(e.target.value)}/>

                        <label htmlFor="tech">Technische vaardigheid 1</label>
                        <input type="text" placeholder="Technische vaardigheid 1" id="tech" onChange={(e) => setTech(e.target.value)}/>

                        <label htmlFor="tech2">Technische vaardigheid 2</label>
                        <input type="text" placeholder="Technische vaardigheid 2" id="tech2" onChange={(e) => setTech2(e.target.value)}/>

                        <button>Maak account</button>
                    </form>
                </div>
            </div>
        )

    async function handleSubmit(e)
    {
        e.preventDefault();
        const result = await addJobdb(titel, inter, tech, tech2, email)
        console.log(result === true)
        if(result === true){

            var jobs = await getJobs(email)
            console.log("jobs:")
            console.log(jobs)
            props.updateUser(jobs)
            history.push("/profile");
        }
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
