import { Helmet } from 'react-helmet';
import {connect} from 'react-redux'

function Feedback(props){

    const criteria = ["Criteria A", "Criteria B", "Criteria C", "Criteria D"]

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