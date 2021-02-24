import { Helmet } from 'react-helmet';
import {connect} from 'react-redux'

function Feedback(props){

    const criteria = ["Criteria A", "Criteria B", "Criteria C", "Criteria D"]
    window.addEventListener('load', function() {
    const video = document.getElementById("video")

    const track = document.createElement("track");
    track.kind = "captions";
    track.label = "English";
    track.srclang = "en";
    track.src = "captions/sintel-en.vtt";
    track.mode = "showing";
    video.textTracks[0].mode = "showing"; // thanks Firefox

    const cueCn = new VTTCue(0, 2.500, '字幕会在0至2.5秒间显示');
    track.addCue(cueCn);

    const cueEn = new VTTCue(2.6, 4, 'Subtitles will display between 2.6 and 4 seconds');
    track.addCue(cueEn);
        
     });


    return(
        <div className="App">
            <Helmet>
                <title>SOS - Feedback</title>
            </Helmet>
            <h1>Feedback</h1>

            <section id="vid-feedback-container">
                <video id="video" src={props.videoList[0]} controls></video>
                

                {criteria.map(criterium => 
                    {
                        return(
                        <section>
                            <input id={criterium} type="checkbox" onChange={onChange}/>
                            <p>{criterium}</p>
                        </section>)
                    }    
                )}

            </section>
        </div>
        
    )

    function onChange(e){
        console.log(`Updated ${e.target.id} to ${e.target.checked}`)
    }

}

const mapStateToProps = (state) => {
    return{
      videoList: state.vidReducer.vidblob
    }
}
export default connect (mapStateToProps)(Feedback);