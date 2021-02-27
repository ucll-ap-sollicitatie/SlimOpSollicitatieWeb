import {getAllVidsDb} from '../user/apiUser'
import {connect} from 'react-redux'
import {Link, useHistory} from "react-router-dom";


function FeedbackSelection(props) {
    const history = useHistory();
    let vids = [];

    return(
        <div className="App">
            <model-viewer
                load={getall()}>
            </model-viewer>

            <h1>Kies video voor feedback op te geven</h1>
            <div id="vids">

            </div>
        </div>
    )

    async function getall() {
        vids = await getAllVidsDb(props.email)

        document.getElementById("vids").innerHTML = ""
        vids.forEach(element => {
            var el = document.createElement("button");
            el.id = element.name;
            el.onclick = onClick
            let htmltext = parseName(element.name.toString())
            el.innerHTML = htmltext
            document.getElementById("vids").append(el)
        });
    }

    function onClick(e){
        console.log(e.target.id)
        let timestamps = []
        vids.forEach(el =>{
            if(el.name === e.target.id){
                timestamps = el.timestamps
            }
        })
        console.log(timestamps)
        props.setVid(e.target.id, timestamps)
        history.push("/feedback")
    }

    function parseName(vidname){
        vidname = vidname.replace(".webm", "")
        vidname = vidname.replace(props.email, "")
        return vidname
    }
}

const mapStateToProps = (state) => {
    console.log("state")
    console.log(state)
    return{
        email: state.users.email
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        setVid: (selectedvid, timestamps) => {
            dispatch({type: 'SET_VID', payload: {selectedvid,timestamps}})
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps) (FeedbackSelection);
 