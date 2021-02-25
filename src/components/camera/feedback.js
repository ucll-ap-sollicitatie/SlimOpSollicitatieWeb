import { Helmet } from 'react-helmet';
import {connect} from 'react-redux'
import React, { useState } from 'react';

function Feedback(props){

    const criteria = ["Criteria A", "Criteria B", "Criteria C", "Criteria D"]

    const [score, setScore] = useState('');
    var scor = 0;
    var scores = {}

    function createEmptyMap(){
        criteria.forEach(el => {
            scores[el] = 0
        });
    }
    console.log(scores)

    return(
        <div className="App">
            <Helmet>
                <title>SOS - Feedback</title>
            </Helmet>
            <h1>Feedback</h1>

            <section id="vid-feedback-container">
                <video id="video" src={"http://localhost:5002/video/" + props.selectedvid} controls></video>
                

                {criteria.map(criterium => 
                    {
                        return(
                        <section>
                            <p>{criterium}</p>
                            <button id={criterium + "ZS"} onClick={ZSClick}>Zeer slecht</button>
                            <button id={criterium} onClick={OKClick}>OK</button>
                            <div id={criterium + "ok"} style={{display: "none"}}>
                                <label for={criterium + "score"}>Points (between 2/5 and 4/5):</label>
                                <input type="range" min="2" max="4" class="slider" id={criterium + "score"} onChange={updateSliderScore}/>
                            </div>
                            <button id={criterium + "ZG"} onClick={ZGClick}>Zeer goed</button>
                        </section>)
                    }    
                )}

                <button onClick={calcScore}>Calculate score</button>
                <button onClick={resetScore}>Reset score</button>
                <p>{score}</p>

            </section>
        </div>
        
    )

    function resetScore(){
        createEmptyMap()
        criteria.forEach(crit => {
            var elem = document.getElementById(crit + "ZS")
            elem.style.display = "";
            var elem = document.getElementById(crit + "ZG")
            elem.style.display = "";
            var elem = document.getElementById(crit)
            elem.style.display = "";

            var elem = document.getElementById(crit + "ok")
            elem.style.display = "none";
        })
        setScore(0)
    }

    function calcScore(){
        var sum = 0
        Object.keys(scores).forEach(el => {
            sum += scores[el]
        })
        setScore(sum)
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

        //set elements invis
        //Zeer slecht
        var elem = document.getElementById(id + "ZS")
        elem.style.display = "none";

        //OK
        var elem = document.getElementById(id)
        elem.style.display = "none";
        console.log(scores)

    }

    function ZSClick(e){
        var id = e.target.id
        id = id.split("ZS")[0]

        //set elements invis
        //Zeer goed
        var elem = document.getElementById(id + "ZG")
        elem.style.display = "none";
        //OK
        var elem = document.getElementById(id)
        elem.style.display = "none";
        scores[id] = 1
        console.log(scores)

    }


    function OKClick(e){
        var okval = e.target.id

        //set elements invis

        var elem = document.getElementById(okval + "ok")
        elem.style.display = "block";

        var elem = document.getElementById(okval + "ZG")
        elem.style.display = "none";

        var elem = document.getElementById(okval + "ZS")
        elem.style.display = "none";

        var elem = document.getElementById(okval)
        elem.style.display = "none";
    }
    
    



}

const mapStateToProps = (state) => {
    return{
        selectedvid: state.vidReducer.selectedvid
    }
}
export default connect (mapStateToProps)(Feedback);
