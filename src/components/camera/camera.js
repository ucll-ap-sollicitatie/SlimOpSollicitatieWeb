import React, { Component } from "react";
import Webcam from "react-webcam"
import vragenlijst from "../questions/questions.js";

class camera extends Component{
  render(){
    return (
      <WebcamStreamCapture />
    );
  }
}

var vragencounter;

const WebcamStreamCapture = () => {
    const webcamRef = React.useRef(null);
    const mediaRecorderRef = React.useRef(null);
    const [capturing, setCapturing] = React.useState(false);
    const [recordedChunks, setRecordedChunks] = React.useState([]);

    function NextQuestion(){
      vragencounter++;
      document.getElementById("overlay").innerHTML = vragenlijst()[vragencounter]
    }

    function showNextButton() {
      var x = document.getElementById("nextQButton");
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
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
      showNextButton();
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
        a.click();
        window.URL.revokeObjectURL(url);
        setRecordedChunks([]);
      }
    }, [recordedChunks]);
  
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
      <div>
        <div id="overlay">{vragenlijst()[0]}</div> 
        <button id="nextQButton" style={{display: "none"}} onClick={NextQuestion}>Next question</button>
        <Webcam audio={true} ref={webcamRef}/>       
      </div>
      {capturing ? (
        <button onClick={handleStopCaptureClick}>Stop Capture</button>
      ) : (
        <button onClick={handleStartCaptureClick}>Start Capture</button>
      )}
      {recordedChunks.length > 0 && (
        <button onClick={handleDownload}>Download</button>
      )}
    </>
  );
  };
  
export default camera;


/** Camera code source: https://codepen.io/mozmorris/pen/yLYKzyp?editors=0011
 *  Camera: react-webcam
 */
