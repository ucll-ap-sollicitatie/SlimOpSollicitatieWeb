import React from 'react';
import logo from '../logo.svg';
import '../App.css';
import {Link} from "react-router-dom";

const Home = () => {
    return(
    <div className="App">
        <h1>Welkom bij slim op sollicitatie</h1>

        <section>
        <h3>Bekijk hier je meest recente videos</h3>
        <img src="https://via.placeholder.com/352x240" style={imageStyle1}/>
        <img src="https://via.placeholder.com/352x240" style={imageStyle}/>
        </section>
        <br/>
        <br/>
        <Link to="/camera"><button>Neem een nieuwe video op</button></Link>
    </div>
    )
}

const imageStyle= {
    marginLeft: 100
}
const imageStyle1= {
    marginRight: 100
}


export default Home;
