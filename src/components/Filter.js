import React, { Component } from 'react';


class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
           min: 0,
           max: 5,
           displayGooglePlaces: true,

        }

        this.minHandleChange = this.minHandleChange.bind(this);
        this.maxHandleChange = this.maxHandleChange.bind(this);

    }

    //define the min rating for a restaurant to display
    minHandleChange(e) {
        const value = e.target["value"]
        this.setState((prevState) => {
            prevState.min = value;
            this.props.onFilter({
                min: value
              });
            return {min: prevState.min}
             }, console.log("min=" + this.state.min));
    }

    //define the max rating for a restaurant to display
    maxHandleChange(e) {
        const value = e.target["value"]
        this.setState((prevState) => {
            prevState.max = value;
            this.props.onFilter({
                max: value
              });
            return {max: prevState.max}
             });
    }

    toggleGooglePlaces(e) {
       const value = e.target.checked;
       this.setState((prevState) => {
           this.props.onFilter({
               displayGooglePlaces: value
             });
           return {displayGooglePlaces: value}
            });
     }

    render() {
        return (<div id="filter">
                        <form className={this.state.className}>
                                    <label>
                                        Display from
                                        <select className='select' name="min"  value={this.state.min} onChange={this.minHandleChange}>
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                    </label>

                                    <label>
                                        to
                                        <select className='select' name="max"  value={this.state.max} onChange={this.maxHandleChange}>
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                    </label>


                        </form>
                </div> );
    }
}

export default Filter;
