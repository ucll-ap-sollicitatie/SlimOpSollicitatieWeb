import React, {Component} from 'react';


class addJob extends Component {
    render() {
        return (<div className="containter">
            <h2>Maak een nieuwe functie aan</h2>
            <form onSubmit={this.handleSubmit} className="wite">
                <label htmlFor="Jobtitel">Jobtitel</label>
                <input type="jobtitel" id="jobtitel" onChange={this.handleChange}/><br/>

                <label htmlFor="skill1">Skill 1</label>
                <input type="skill1" id="skill1" onChange={this.handleChange}/><br/>
                <label htmlFor="skill2">Skill 3</label>
                <input type="skill2" id="skill2" onChange={this.handleChange}/><br/>
                <label htmlFor="skill3">Skill 3</label>
                <input type="skill3" id="skill3" onChange={this.handleChange}/>

                <button>Voeg job toe</button>
            </form>
        </div>);
    }
}

export default addJob
