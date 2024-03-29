import React, {Component} from "react";
import Webcam from "react-webcam"
import {vragenlijst, parsedvragenlijst} from "../questions/questions.js";
import {connect} from "react-redux";
import axios from "axios";
import {videoInDb} from "../user/apiUser";
import { useHistory } from "react-router-dom";

var vl;
var videoBlob;
var glprops;
var email;
var cap = false;
var cap2 = false;
var title = "";
var history; 

function Camera(props) {
    history = useHistory();
    title = props.selectedJobTitle
    var skills = props.selectedSkills
    email = props.email
    vl = parsedvragenlijst(title, skills)
    glprops = props

    return (
        <WebcamStreamCapture/>
    );
}


var vragencounter;
var startTimer;
var timeArray;
var txt;
var uploadTxt;
var timestamps;

//the question list that will be used
//const vl = parsedvragenlijst("title", ["Vriendelijk", "Snel"])
console.log(vl)
const WebcamStreamCapture = () => {
    const webcamRef = React.useRef(null);
    const mediaRecorderRef = React.useRef(null);
    const [capturing, setCapturing] = React.useState(false);
    const [recordedChunks, setRecordedChunks] = React.useState([]);

    function NextQuestion() {
        timeArray.push(((new Date()).getTime() - startTimer) / 1000)
        timestamps.push(((new Date()).getTime() - startTimer) / 1000)
        timeArray.push(vl[vragencounter])      
        // console.log(timeArray.join('\r\n'))
        if (vragencounter < vl.length - 1) {
            vragencounter++;
            if (vragencounter == vl.length - 1) {
                document.getElementById("nextQButton").style.visibility = "hidden"
                document.getElementById("stop").hidden = false
            }
        }
        document.getElementById("overlay").innerHTML = vl[vragencounter]
    }

    function showNextButton() {
        var x = document.getElementById("nextQButton");
        if (x.style.visibility === "hidden") {
            x.style.visibility = "visible";
        } else {
            x.style.visibility = "hidden";
        }
    }

    const handleStartCaptureClick = React.useCallback(() => {
        /** Start */
        vragencounter = 0;
        timeArray = [];
        timestamps = [];
        timestamps.push(0.00)
        timeArray.push(vl[0])
        startTimer = (new Date()).getTime()
        showNextButton();
        setCapturing(true);


        mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
            mimeType: "video/webm"
        });
        mediaRecorderRef.current.addEventListener(
            "dataavailable",
            handleDataAvailable
        );        
        mediaRecorderRef.current.start();
    }, [webcamRef, setCapturing, mediaRecorderRef]);

    const handleDataAvailable = React.useCallback(
        ({data}) => {
            if (data.size > 0) {
                setRecordedChunks((prev) => prev.concat(data));
            }
        },
        [setRecordedChunks]
    );

    const handleStopCaptureClick = React.useCallback(() => {
        document.getElementById("caps").hidden = true
        /** Stop */
        document.getElementById("overlay").innerHTML = vl[0]
        document.getElementById("nextQButton").style.visibility = "hidden"
        mediaRecorderRef.current.stop();
        setCapturing(false);
    }, [mediaRecorderRef, webcamRef, setCapturing]);

    const handleDownload = React.useCallback(() => {
        if (recordedChunks.length) {
            const blob = new Blob(recordedChunks, {
                type: "video/webm"
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            a.href = url;
            a.download = "react-webcam-stream-capture.webm";
            //a.click();
            /** -------------------- */
            videoBlob = URL.createObjectURL(blob);
            timeArray.push(((new Date()).getTime() - startTimer) / 1000)
            txt = timeArray.join('\r\n')
            uploadTxt = makeTxt(txt.toString())
            var fileName = email + Date.now().toString() + "-job" + title + ".webm"
            var txtName = email + Date.now().toString() + ".txt"
            //console.log(glprops)
            glprops.setBlob(videoBlob)
            const uplVid = new FormData()
            uplVid.append("new vid", blob, fileName)
            uplVid.append("txt", uploadTxt, txtName)
            videoInDb(fileName, email, timestamps)

            axios({
                method: "POST",
                url: "https://slimopsollicitatie.xyz:3001/upload",
                data: uplVid,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
                .then(response => {
                        if (response.status === 200) {

                            console.log("Success, firm added")
                        } else {
                            console.log("Error occurred")
                        }
                    }
                ).catch(e => {
                console.log(e)
            })

            //update state here

            /** VIDEO TRACKS
             var video = document.getElementById("video"), track;

             video.addEventListener("onplay", function() {
          track = this.addTextTrack("captions", "English", "en");
          track.mode = "showing";
        track.addCue(new VTTCue(0, 12, "[Test]"));
        track.addCue(new VTTCue(18.7, 21.5, "This blade has a dark past."));
        track.addCue(new VTTCue(22.8, 26.8, "It has shed much innocent blood."));
        });
             */
            /** -------------------- */
            window.URL.revokeObjectURL(url);
            setRecordedChunks([]);
            history.push("/")
        }
    }, [recordedChunks]);
    /**
     * FOR LATER USE WHEN DOWNLOAD & SAVE WORK
     *
     * const handleDownload = React.useCallback(() => {
      if (recordedChunks.length) {
        const blob = new Blob(recordedChunks, {
          type: "video/webm"
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = url;
        a.download = "react-webcam-stream-capture.webm";
        a.click();

        window.URL.revokeObjectURL(url);
        setRecordedChunks([]);
      }
    }, [recordedChunks]);
     */

//    return (  /** returns webcam + check capturing state to start/stop/download */
//      <div style={{position: "relative"}}>
//        <Webcam audio={true} ref={webcamRef}>
//          <div id="overlay" style={{position: "absolute", fontSize: "500px", color: "white"}}>YEET</div> 
//        </Webcam>
//        {capturing ? (
//          <button onClick={handleStopCaptureClick}>Stop Capture</button>
//        ) : (
//          <button onClick={handleStartCaptureClick}>Start Capture</button>
//        )}
//        {recordedChunks.length > 0 && (
//          <button onClick={handleDownload}>Download</button>
//        )}
//      </div>
//    );
var timer = setInterval(checker,1000);
function checker(){
    if(document.getElementById("start") != null){
        cap = true;
        document.getElementById("start").hidden = false
        clearInterval(timer)
    }
}

var timer2 = setInterval(checker2,100);
function checker2(){
    if(document.getElementById("stop") != null){
        cap2 = true;
        document.getElementById("stop").hidden = true
        clearInterval(timer2)
    }
}

    return (  /** returns webcam + check capturing state to start/stop/download */
        <>
            <div className="centerPage">
                <div id="overlay">{vl[0]}</div>
                <button id="nextQButton" style={{visibility: "hidden"}} onClick={NextQuestion}>Volgende vraag</button>
            </div>
            <div id="cameraDiv">

                <Webcam audio={true} ref={webcamRef}/>
                <br/>
                <div id="caps">
                {capturing ? (
                    <button id="stop" onClick={handleStopCaptureClick}>Stop Opname</button>
                ) : (
                    <button id="start" onClick={handleStartCaptureClick} hidden>Start Opname</button>
                )}
                </div>
                {timer.visibility}
                {timer2.visibility}
                {recordedChunks.length > 0 && (
                    <button onClick={handleDownload}>Opslaan</button>
                )}
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        selectedJobTitle: state.users.selectedJobTitle,
        selectedSkills: state.users.selectedSkills,
        email: state.users.email
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setBlob: (vidblob) => {
            dispatch({type: 'SET_BLOB', payload: {vidblob}})
        }
    }
}

function makeTxt(text) {
    var data = new Blob([text], {type: 'text/plain'});


    return data
}

export default connect(mapStateToProps, mapDispatchToProps)(Camera);

/** Camera code source: https://codepen.io/mozmorris/pen/yLYKzyp?editors=0011
 *  Camera: react-webcam
 *
 * Webm preview: https://jsfiddle.net/Sjeiti/wnLxoejh/
 */
