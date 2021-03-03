import React, { useState } from 'react';
import {registerdb} from "../user/apiUser"
import { useHistory } from "react-router-dom";



function Register(props){
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [confPass, setConfPass] = useState('');
    const [voornaam, setVoornaam] = useState('');



    return (
        <div className="centerPage ">
            <div className="container registerPage">
                <h1>Gelieve te registreren</h1>
                <form onSubmit={handleSubmit} className="wite">
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder="Email" id="email" onChange={(e) => setEmail(e.target.value)}/>
                    <p id="eremail"  style={{display: "none"}}>Email kan niet leeg zijn of is geen email adres</p>

                    <label htmlFor="username">Gebruikersnaam</label>
                    <input type="text" placeholder="Username" id="username" onChange={(e) => setUsername(e.target.value)}/>
                    <p id="eruser"  style={{display: "none"}}>Gelieve een gebruikersnaam in te vullen</p>

                    <label htmlFor="voornaam">Voornaam</label>
                    <input type="text" placeholder="Voornaam" id="voornaam" onChange={(e) => setVoornaam(e.target.value)}/>
                    <p id="ervn"  style={{display: "none"}}>Gelieve je voornaam in te vullen</p>

                    <label htmlFor="password">Wachtwoord</label>
                    <input type="password" placeholder="Password" id="password" onChange={(e) => setPassword(e.target.value)}/>
                    <p id="erpw"  style={{display: "none"}}>Wachtwoord mag niet leeg zijn</p>

                    <label htmlFor="confpassword">Herhaal Wachtwoord</label>
                    <input type="password" placeholder="Confirm Password" id="confpassword" onChange={(e) => setConfPass(e.target.value)}/>
                    <p id="erconf"  style={{display: "none"}}>De wachtwoorden komen niet overeen</p>

                    <button>Maak account</button>
                </form>

                <div>
                    <p id="error" style={{display: "none"}}>Er was een probleem met het aanmaken van jouw account</p>
                </div>

            </div>
        </div>
    );


    /**
     * When a user submits the form,
     * 1. preventDefault: https://www.w3schools.com/jsref/event_preventdefault.asp
     * 2. TODO: check if pass and confirm pass is the same
     * 3. registerdb calls the api
     * 4.1. TODO: Clear fields when input is wrong
     * 4.2. redirect to home page when login is succesfull
     */


    async function handleSubmit(e)
    {
        var elemt = document.getElementById("eruser")
        var erremail = document.getElementById("eremail")
        var ervn = document.getElementById("ervn")
        var erpw = document.getElementById("erpw")
        var erconf = document.getElementById("erconf")

        elemt.style.display = "none"
        erremail.style.display = "none"
        ervn.style.display = "none"
        erpw.style.display = "none"
        erconf.style.display = "none"
        e.preventDefault();

        if(username.replace(/\s/g,'') === ''){
            elemt.style.display = "block"
            return
        } else if(email === "" || !email.includes(".")){
            erremail.style.display = "block"
            return
        }
        else if(voornaam.replace(/\s/g,'') === ""){
            ervn.style.display = "block"
            return
        } else if(password.replace(/\s/g,'') === ""){
            erpw.style.display = "block"
            return
        } else if(confPass !== password){
            erconf.style.display = "block"
            return
        }
        else
            console.log(username)
        elemt.style.display = "none"
        const result = await registerdb(email, password, username, confPass, voornaam)
        console.log(result === true)
        if(result === true){
            history.push("/login");
        }

        /**
         * Error when server returns error (general)
         */
        else{
            var elem = document.getElementById("error")
            if (elem.style.display === "none") {
                elem.style.display = "block";
            }
        }
    }
}

export default Register;
