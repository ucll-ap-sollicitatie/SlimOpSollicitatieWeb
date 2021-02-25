import React from 'react';
import logo from '../logo.svg';
import '../App.css';
import {Link} from "react-router-dom";
import {connect} from 'react-redux'
import { useHistory } from "react-router-dom";
import { Helmet } from 'react-helmet';
import {getRecentVideos} from './user/apiUser'

function Home(props) {
    const history = useHistory();


    const vid = "http://localhost:5002/video/" + ""
    return(
    <div className="App">
        <Helmet>
            <title>SOS - Home</title>
        </Helmet>

        <button onClick={recenVisq}>B</button>
        
        <h1>Welkom bij slim op sollicitatie</h1>

        <section>
        <h3>Bekijk hier je meest recente videos</h3>
            <video controls width="360">
                <source src={vid} type="video/webm"/>
            </video>
        <img src="https://via.placeholder.com/352x240" style={imageStyle}/>
        </section>
        <br/>
        <br/>
        <Link to="/chooseJob"><button>Neem een nieuwe video op</button></Link>
    </div>
    )
}

const imageStyle= {
    marginLeft: 100
}
const imageStyle1= {
    marginRight: 100,
}

async function recenVisq(email) {
    try{
    var vids = await getRecentVideos("t@t")
    console.log("recenVisq: " + vids)
    }catch(err){
        console.log(err)
    }
    return vids 
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
