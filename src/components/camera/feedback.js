import { Helmet } from 'react-helmet';
import {connect} from 'react-redux'
import React, { useState } from 'react';
import {getAllFeedbackArray, parseQuestionFeedback} from '../questions/feedbackquestions'
import {setFeedback, getFeedback} from '../user/apiUser'
import e from 'cors';
var scores = {}

function Feedback(props){

    //in empty spaces you can add the specific skill. For now we don't have this functionality
    const criteria = parseQuestionFeedback(props.vnaam, "", "")
    const [timestampslist, setTimestamps] = useState(Array.from(props.timestamps));
    const [score, setScore] = useState('');
    const [criterium, setCrit] = useState(criteria[0])
    var index = criteria.indexOf(criterium)
  
    console.log(scores)
    return(
        <div className="centerPage">
            <Helmet>
                <title>SOS - Feedback</title>
            </Helmet>

            <model-viewer
                load={getSavedFeedback()}>
            </model-viewer>

            <h1>Feedback</h1>

            <section id="vid-feedback-container">
                <video id="video" src={"http://localhost:5002/video/" + props.selectedvid} controls width="640" height="480"></video>
                
                <section>
                    <div className="feedbackQ" onClick={changeCritnext}>{criterium}</div>
                    <button id={criterium + "ZS"} onClick={ZSClick}>Zeer slecht</button>
                    <button id={criterium} onClick={OKClick}>OK</button>
                    <div id={criterium + "ok"} style={{display: "none"}}>
                        <label htmlFor={criterium + "score"}>Points (between 2/5 and 4/5):</label>
                        <input type="range" min="2" max="4" className="slider" id={criterium + "score"} onChange={updateSliderScore}/>
                    </div>
                    <button id={criterium + "ZG"} onClick={ZGClick}>Zeer goed</button>

                </section>

                <button onClick={changeCritprev}>Vorige</button>
                <button onClick={changeCritnext}>Volgende</button>

                {/* <button onClick={calcScore}>Calculate score</button>
                <button onClick={createEmptyMap}>Reset score</button> */}
                <button onClick={saveFeedback}>Feedback opslaan</button>

            </section>
        </div>
        
    )
 

    async function getSavedFeedback() {
        var rs = await getFeedback(props.selectedvid)
        console.log(rs)
    }

    function saveFeedback() {
        setFeedback(props.selectedvid, scores)
    }

    function handleTimeSwitch(e){
        goToTime(e.target.id)
    }
   /**
     * Change the current time of the video to t seconds
     */
    function goToTime(t) {
        var elem = document.getElementById("video");
        var srcB = document.getElementById("video").src;
        elem.src = srcB
        elem.currentTime = t
        elem.play()
    }

    /**
     * find currect timestamp of question id
     */
    function correctTimeStamp(id){
        if(timestampslist[id]){
            id = id
        }else id = 0
        goToTime(timestampslist[id])
    }

    /**
     * go to the previous question
     */
    
    function changeCritprev() {
        //get current index
        
        //update index
        if (index > 0){
            index -= 1
            correctTimeStamp(index)
            setCrit(criteria[index])
        }
    }

    /**
     * go to the next question
     */
    function changeCritnext() {
        //get current index
        
        //update index
        if (index < criteria.length -1){
            index += 1
            correctTimeStamp(index)
            setCrit(criteria[index])
        }
    }


   /**
     * 
     */
    function updateSliderScore(e){
        var val = e.target.value
        var id = e.target.id
        id = id.split("score")[0]
        scores[id] = parseInt(val)
        console.log(scores)

    }

    /**
     * 
     */
    function ZGClick(e){
        console.log(`Awarded 5 points!`)
        var id = e.target.id
        id = id.split("ZG")[0]
        scores[id] = 5
        console.log(scores)
    }
   /**
     * 
     */
    function ZSClick(e){
        var id = e.target.id
        id = id.split("ZS")[0]
        scores[id] = 1
        console.log(scores)
    }


    function OKClick(e){
        var okval = e.target.id
    }
    
    



}

const mapStateToProps = (state) => {
    return{
        selectedvid: state.vidReducer.selectedvid,
        timestamps: state.vidReducer.timestamps,
        vnaam: state.users.voornaam
    }
}


export default connect (mapStateToProps)(Feedback);
