import {getAllVidsDb} from '../user/apiUser'
import {connect} from 'react-redux'
import {Link, useHistory} from "react-router-dom";


function FeedbackSelection(props) {
    const history = useHistory();

    return(
        <div className="App">
            <model-viewer
                load={getall()}>
            </model-viewer>

            <h1>Choose video</h1>
            <div id="vids">

            </div>
        </div>
    )

    async function getall() {
        let vids = await getAllVidsDb(props.email)
        var timestamps = vids.timestamps

        document.getElementById("vids").innerHTML = ""
        vids.forEach(element => {
            var el = document.createElement("button");
            el.id = element.name;
            el.onclick = onClick
            let htmltext = parseName(element.name.toString())
            el.innerHTML = htmltext
            document.getElementById("vids").append(el)
            console.log(element)
        });
    }

    function onClick(e){
        console.log(e.target.id)
        props.setVid(e.target.id)
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
        setVid: (selectedvid) => {
            dispatch({type: 'SET_VID', payload: {selectedvid}})
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps) (FeedbackSelection);
 