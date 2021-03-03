import { Helmet } from 'react-helmet';
import {connect} from 'react-redux'
import React, { useState } from 'react';
import {getAllFeedbackArray, parseQuestionFeedback} from '../questions/feedbackquestions'
import {setFeedback, getFeedback} from '../user/apiUser'
import e from 'cors';
import { useHistory } from "react-router-dom";


var scores = {}
var dbFeedback = {};

function Feedback(props){

    const history = useHistory();
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
<p>Geef hier je feedback op de opgenome video. Dit is aan de hand van een puntensysteem.</p>
<p>Kies een waarde uit: Zeer slecht(1/5), Zeer goed(5/5), Oké (een waarde tussen 2/5 en 4/5)</p>
<p>Wanneer je de volgende vraag wilt beoordelen, gebruik de knop 'Volgende'</p>
            <section id="vid-feedback-container">
                <video id="video" src={"https://slimopsollicitatie.xyz:3001/video/?vid=" + props.selectedvid} controls width="640" height="480"></video>
                
                <section>
                    <div className="feedbackQ" onClick={changeCritnext}>{criterium}</div>
                    <button id={criterium + "ZS"} onClick={ZSClick}>Zeer slecht (1/5)</button>
                    <button id={criterium} onClick={OKClick}>Oké</button>
                    <div id={criterium + "ok"} style={{display: "none"}}>
                        <label htmlFor={criterium + "score"}>2/5</label>
                        <input type="range" min="2" max="4" className="slider" id={criterium + "score"} onChange={updateSliderScore}/>
                        <p style={{display: 'inline'}}>4/5</p>
                    </div>
                    <button id={criterium + "ZG"} onClick={ZGClick}>Zeer goed (5/5)</button>

                </section>
                <br/>

                <button style={{backgroundColor : "#025669"}} onClick={changeCritprev}>Vorige vraag</button>
                <button style={{backgroundColor : "#025669"}} onClick={changeCritnext}>Volgende vraag</button>

                {/* <button onClick={calcScore}>Calculate score</button>
                <button onClick={createEmptyMap}>Reset score</button> */}
                <br/>
                <br/>
                
                <div hidden id="hide_save">
                <p>Wanneer je <b>alle</b> vragen hebt beoordeeld, kan je hier de feedback oplaan</p>
                <button onClick={saveFeedback}>Feedback opslaan</button>
                </div>
            </section>
        </div>
        
    )

    function keepZG(crit){
        document.getElementById(crit + "ZS").style.display = "none"
        document.getElementById(crit).style.display = "none"
        document.getElementById(crit + "ok").style.display = "none"
        document.getElementById(crit + "ZG").style.display = "inline"
    }

    function keepZS(crit){
        console.log(crit + "ZG")
        console.log(document.getElementById(crit + "ZG"))
        try{
          document.getElementById(crit + "ZG").style.display = "none"
          document.getElementById(crit).style.display = "none"
          document.getElementById(crit + "ok").style.display = "none"

          document.getElementById(crit + "ZS").style.display = "inline"

        }catch(err){
            console.log("err")
        }
    }

    function keepok(crit){
        document.getElementById(crit + "ZG").style.display = "none"
        document.getElementById(crit + "ZS").style.display = "none"
        document.getElementById(crit).style.display = "inline"

    }

    function displayAll(crit) {
        //console.log(document.getElementById(crit + "ZG"))
        document.getElementById(crit + "ZG").style.display = "inline"
        document.getElementById(crit + "ZS").style.display = "inline"
        document.getElementById(crit).style.display = "inline"

    }
 
    async function getSavedFeedback() {
        var rs = await getFeedback(props.selectedvid)
        dbFeedback = rs
        console.log(rs)
        return rs
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
        try{

       

        if(timestampslist[id]){
            id = id
        }else id = 0
        goToTime(timestampslist[id])
    }catch(err){
        history.push("/error")
    }
    }

    /**
     * go to the previous question
     */
    async function changeCritprev() {
        //get current index
        //update index
            if (index > 0){
                displayAll(criteria[index])
                index -= 1

                try{
                    correctTimeStamp(index)
                    await setCrit(criteria[index])
                    try{

                    var value = dbFeedback[criteria[index]]
                    var crit = criteria[index]
                    if(value != null && crit != null){
                        showCorrectFeedback(value, crit)
                    }
                    }catch(err){
                        console.log(err)
                    }
                }catch(err){
                    history.push("/error")
                }
            }
    }

    function showCorrectFeedback(value, crit) {
        console.log("showCorrectFeedback")
        if(value === 1){
            console.log(value)
            keepZS(crit)
        }
        if(value === 5){
            console.log(value)
            keepZG(crit)
        }
        if(value === 2 || value === 3 || value === 4){
            keepok(crit)
        }
    }

    /**
     * go to the next question
     */
    async function changeCritnext() {
        //get current index
        
        //update index
        if (index < criteria.length -1){
            
            displayAll(criteria[index])

            index += 1
            console.log(criteria[index])
            correctTimeStamp(index)
            await setCrit(criteria[index])
            try{
                var value = dbFeedback[criteria[index]]
                var crit = criteria[index]
                showCorrectFeedback(value, crit)
            }catch(err){
                console.log(err)
            }

        }
        else {
            document.getElementById("hide_save").hidden = false
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
        keepZG(id)
        console.log(scores)
    }

   /**
     * 
     */
    function ZSClick(e){
        var id = e.target.id
        id = id.split("ZS")[0]
        scores[id] = 1
        keepZS(id)
        console.log(scores)
    }

    function OKClick(e){
        var okval = e.target.id  
        var id = okval + "ok"
        keepok(okval)
        document.getElementById(id).style.display = "inline"
        document.getElementById(okval).style.display = "none"

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
