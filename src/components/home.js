import React, {useState, useEffect} from 'react';
import logo from '../logo.svg';
import '../App.css';
import {Link} from "react-router-dom";
import {connect} from 'react-redux'
import {useHistory} from "react-router-dom";
import {Helmet} from 'react-helmet';
import {getRecentVideos} from './user/apiUser'
import {get} from "react-hook-form";

var test = 0;


function Home(props) {


    console.log("LALALALALALALALAL:" + test)
    const history = useHistory();
    return (
        <div className="App">
            <model-viewer
                load={recenVid()}>
            </model-viewer>
            <Helmet>
                <title>SOS - Home</title>
            </Helmet>

            <h1>Welkom bij slim op sollicitatie</h1>

            <section>
                <h3>Bekijk hier je meest recente videos</h3>
                <div id="vids">

                </div>
            </section>
            <br/>
            <br/>
            <Link to="/chooseJob">
                <button>Neem een nieuwe video op</button>
            </Link>
        </div>

    )

    async function recenVid() {

            if(props.email == null){
                history.push("/login")
            }
            try {
                var email = props.email
                var vids = await getRecentVideos(email)
                console.log("VIDEOS= " + vids.length)
                const myNode = document.getElementById("vids");
                myNode.innerHTML = '';
                if(vids.length === 2 ){
                var vid1 = document.createElement("video");
                vid1.controls = true
                vid1.setAttribute('width', "360")
                vid1.setAttribute('src', "http://localhost:5002/video/" + vids[0])
                vid1.setAttribute('type', "video/webm")
                vid1.setAttribute('id', 'vid1')
                document.getElementById("vids").append(vid1)

                var vid2 = document.createElement("video");
                vid2.controls = true
                vid2.setAttribute('width', "360")
                vid2.setAttribute('src', "http://localhost:5002/video/" + vids[1])
                vid2.setAttribute('type', "video/webm")
                document.getElementById("vids").append(vid2)
                } else if(vids.length === 0) {
                    var noVid = document.createElement("noVid");
                    noVid.innerText = "Maak snel een nieuwe video je hebt er nog geen !!!"
                    myNode.append(noVid)
                } else {
                    var vid3 = document.createElement("video");
                    vid3.controls = true
                    vid3.setAttribute('width', "360")
                    vid3.setAttribute('src', "http://localhost:5002/video/" + vids[0])
                    vid3.setAttribute('type', "video/webm")
                    vid3.setAttribute('id', 'vid3')
                    document.getElementById("vids").append(vid3)
                }
            } catch (err) {
                console.log(err)
            }
            return vids
        }
}

const imageStyle = {
    marginLeft: 100
}
const imageStyle1 = {
    marginRight: 100,
}


const mapStateToProps = (state) => {
    console.log("state")
    console.log(state)
    return {
        email: state.users.email
    }
}

/**
 * maps the props to the dispatch so that you can dispatch within a class
 */
const mapDispatchToProps = (dispatch) => {
    return {
        logoutUser: (email) => {
            dispatch({type: 'LOGOUT_USER'})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
