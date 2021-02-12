import React from 'react'

function Login() {
    return(
        <div>
        <h1>Gelieve in te loggen</h1>
        <form>
            <label>
                <p>Gebruikersnaam</p>
                <input type="text" id="uName"/>
            </label>
            <label>
                <p>Wachtwoord</p>
                <input type="password" id="uPass"/>
            </label>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
        </div>
    )
}



export default Login;
