import React, { Component } from "react";
import Webcam from "react-webcam"
import {vragenlijst, parsedvragenlijst} from "../questions/questions.js";
import {connect} from "react-redux";

var vl;


function Camera(props) {
  var title = props.selectedJobTitle
  var skills = props.selectedSkills
  vl = parsedvragenlijst(title, skills)
    return (
      <WebcamStreamCapture />
    );
}

var vragencounter;

//the question list that will be used
//const vl = parsedvragenlijst("title", ["Vriendelijk", "Snel"])
console.log(vl)
const WebcamStreamCapture = () => {
    const webcamRef = React.useRef(null);
    const mediaRecorderRef = React.useRef(null);
    const [capturing, setCapturing] = React.useState(false);
    const [recordedChunks, setRecordedChunks] = React.useState([]);
    function NextQuestion(){
      if(vragencounter < vl.length -1 ){
        vragencounter++;
        if(vragencounter == vl.length -1){
          document.getElementById("nextQButton").style.visibility = "hidden"
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
  
    const handleStartCaptureClick = React.useCallback(() => { /** Start */
      vragencounter = 0;
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
      ({ data }) => {
        if (data.size > 0) {
          setRecordedChunks((prev) => prev.concat(data));
        }
      },
      [setRecordedChunks]
    );
  
    const handleStopCaptureClick = React.useCallback(() => { /** Stop */
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
        document.getElementById("showskill").src = URL.createObjectURL(blob);






























        /** -------------------- */
        window.URL.revokeObjectURL(url);
        setRecordedChunks([]);
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

  return (  /** returns webcam + check capturing state to start/stop/download */
    <>
    <div className="centerPage">
    <div id="overlay">{vl[0]}</div> 
    <button id="nextQButton" style={{visibility: "hidden"}} onClick={NextQuestion}>Next question</button>
    </div>
      <div id="cameraDiv">
        
        <Webcam audio={true} ref={webcamRef}/>       
      <br/>
      {capturing ? (
        <button onClick={handleStopCaptureClick}>Stop Capture</button>
      ) : (
        <button onClick={handleStartCaptureClick}>Start Capture</button>
      )}
      {recordedChunks.length > 0 && (
        <button onClick={handleDownload}>Download</button>
      )}
      </div>
      <video id="showskill" controls></video>
    </>
  );
  };
  
  const mapStateToProps = (state) => {
    return{
      selectedJobTitle: state.users.selectedJobTitle,
      selectedSkills: state.users.selectedSkills
    }
}

export default connect (mapStateToProps)(Camera);

/** Camera code source: https://codepen.io/mozmorris/pen/yLYKzyp?editors=0011
 *  Camera: react-webcam
 * 
 * Webm preview: https://jsfiddle.net/Sjeiti/wnLxoejh/
 */
