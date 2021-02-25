import React from 'react';
import logo from '../logo.svg';
import '../App.css';
import {Link} from "react-router-dom";
import {connect} from 'react-redux'
import { useHistory } from "react-router-dom";
import { Helmet } from 'react-helmet';

function Home(props) {
    const history = useHistory();

    return(
        
    <div className="App">
        <Helmet>
            <title>SOS - Home</title>
        </Helmet>
        
        <h1>Welkom bij slim op sollicitatie</h1>

        <section>
        <h3>Bekijk hier je meest recente videos</h3>
        <img src="https://via.placeholder.com/352x240" style={imageStyle1}/>
        <img src="https://via.placeholder.com/352x240" style={imageStyle}/>
        </section>
        <br/>
        <br/>
        <Link to="/chooseJob"><button>Neem een nieuwe video op</button></Link>
        <button onClick={getvids}>click</button>
    </div>
    )
}

const imageStyle= {
    marginLeft: 100
}
const imageStyle1= {
    marginRight: 100,
}


function getvids() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', './uploads/jens.massie@mail.com1614243669730.webm', true);
    xhr.responseType = 'blob';
    xhr.send();
}

const mapStateToProps = (state) => {
    console.log("state")
    console.log(state)
    return{
        email: state.users
    }
}

/**
 * maps the props to the dispatch so that you can dispatch within a class
 */
const mapDispatchToProps = (dispatch) => {
    return{
        logoutUser: (email) => {
            dispatch({type: 'LOGOUT_USER'})
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (Home);
