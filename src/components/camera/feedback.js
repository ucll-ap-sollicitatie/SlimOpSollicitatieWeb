import { Helmet } from 'react-helmet';

function Feedback(props){

    const criteria = ["Criteria A", "Criteria B", "Criteria C", "Criteria D"]

    return(
        <div className="App">
            <Helmet>
                <title>SOS - Feedback</title>
            </Helmet>
            <h1>Feedback</h1>

            <section id="vid-feedback-container">
                <img src="https://via.placeholder.com/768x432"></img>
                
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



export default Feedback