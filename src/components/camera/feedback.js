import { Helmet } from 'react-helmet';
import {connect} from 'react-redux'
import React, { useState } from 'react';
import {getAllFeedbackArray} from '../questions/feedbackquestions'
import e from 'cors';
function Feedback(props){

    const criteria = getAllFeedbackArray()
    const [timestampslist, setTimestamps] = useState(Array.from(props.timestamps));
    const [score, setScore] = useState('');
    const [criterium, setCrit] = useState(criteria[0])

    var scor = 0;
    var scores = {}
    function createEmptyMap(){
        criteria.forEach(el => {
            scores[el] = 0
        });
        console.log(scores)
    }
    console.log(scores)
    return(
        <div className="App">
            <Helmet>
                <title>SOS - Feedback</title>
            </Helmet>
            <h1>Feedback</h1>

            <section id="vid-feedback-container">
                <video id="video" src={"http://localhost:5002/video/" + props.selectedvid} controls width="640" height="480"></video>
                
                <section>
                    <div onClick={changeCritnext}>{criterium}</div>
                    <button id={criterium + "ZS"} onClick={ZSClick}>Zeer slecht</button>
                    <button id={criterium} onClick={OKClick}>OK</button>
                    <div id={criterium + "ok"} style={{display: "none"}}>
                        <label for={criterium + "score"}>Points (between 2/5 and 4/5):</label>
                        <input type="range" min="2" max="4" class="slider" id={criterium + "score"} onChange={updateSliderScore}/>
                    </div>
                    <button id={criterium + "ZG"} onClick={ZGClick}>Zeer goed</button>

                </section>

                <button onClick={changeCritprev}>Vorige</button>
                <button onClick={changeCritnext}>Volgende</button>

                {/* <button onClick={calcScore}>Calculate score</button>
                <button onClick={createEmptyMap}>Reset score</button> */}
                <p>{score}</p>


                <section id="timestamps">
                    {timestampslist.map(el => {
                        return(
                            <div>
                                <button id={el} onClick={handleTimeSwitch}>{el}</button>
                            </div>
                        )
                    })}
                </section>

            </section>
        </div>
        
    )

    function handleTimeSwitch(e){
        goToTime(e.target.id)
    }

    function goToTime(t) {
        var elem = document.getElementById("video");
        var srcB = document.getElementById("video").src;
        elem.src = srcB
        elem.currentTime = t
         
        elem.play()
        console.log(elem.currentTime)
        console.log(elem)
    }

    function correctTimeStamp(id){
        if(timestampslist[id]){
            id = id
        }else id = 0
        goToTime(timestampslist[id])
    }

    function changeCritprev() {
        var index = criteria.indexOf(criterium)
        if (index > 0){
            index = index - 1
        }
        else{
            index = criteria.length -1
        }
        correctTimeStamp(index)
        setCrit(criteria[index])
    }

    function changeCritnext() {
        var index = criteria.indexOf(criterium)
        if (index < criteria.length -1){
            index = index + 1
        }
        else{
            index = 0
        }
        correctTimeStamp(index)
        setCrit(criteria[index])
    }

    function resetScore(){
        
    }

    function calcScore(){
        
    }

    function updateSliderScore(e){
        var val = e.target.value
        var id = e.target.id
        id = id.split("score")[0]
        scores[id] = parseInt(val)
        console.log(scores)

    }

    function ZGClick(e){
        console.log(`Awarded 5 points!`)
        var id = e.target.id
        id = id.split("ZG")[0]
        scores[id] = 5
        console.log(scores)
    }

    function ZSClick(e){
        var id = e.target.id
        id = id.split("ZS")[0]

    }


    function OKClick(e){
        var okval = e.target.id


    }
    
    



}

const mapStateToProps = (state) => {
    return{
        selectedvid: state.vidReducer.selectedvid,
        timestamps: state.vidReducer.timestamps
    }
}


export default connect (mapStateToProps)(Feedback);
