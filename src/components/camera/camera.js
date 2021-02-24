import React, { Component } from "react";
import Webcam from "react-webcam"
import {vragenlijst, parsedvragenlijst} from "../questions/questions.js";
import {connect} from "react-redux";
import axios from "axios";

var vl;
var videoBlob;
var glprops;
function Camera(props) {
  var title = props.selectedJobTitle
  var skills = props.selectedSkills
  vl = parsedvragenlijst(title, skills)
  glprops = props
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
        videoBlob = URL.createObjectURL(blob);
        console.log(glprops) 
        glprops.setBlob(videoBlob)
        const uplVid = new FormData()
        uplVid.append("new vid", blob)

          axios({
              method: "POST",
              url: "http://localhost:5002/upload",
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
    </>
  );
  };
  
  const mapStateToProps = (state) => {
    return{
      selectedJobTitle: state.users.selectedJobTitle,
      selectedSkills: state.users.selectedSkills
    }
}
const mapDispatchToProps = (dispatch) => {
  return{
      setBlob: (vidblob) => {
          dispatch({type: 'SET_BLOB', payload: {vidblob}})
      }
  }
}

export default connect (mapStateToProps,mapDispatchToProps)(Camera);

/** Camera code source: https://codepen.io/mozmorris/pen/yLYKzyp?editors=0011
 *  Camera: react-webcam
 * 
 * Webm preview: https://jsfiddle.net/Sjeiti/wnLxoejh/
 */
