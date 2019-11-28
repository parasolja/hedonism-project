/*
 * Component to filter restaurants to display
 */

import React, { Component } from 'react';

class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
           min: 0,
           max: 5,
           displayGooglePlaces: true,
           className:"d-none d-md-block"
        }

        this.minHandleChange = this.minHandleChange.bind(this);
        this.maxHandleChange = this.maxHandleChange.bind(this);
        this.toggleGooglePlaces = this.toggleGooglePlaces.bind(this);
        this.hideShowFilter = this.hideShowFilter.bind(this);
    }

    hideShowFilter(){
        this.setState((prevState)=>{
                if((prevState.className === "d-none d-md-block")
                    ||(prevState.className === "d-block")){
                    return{
                        className: "d-none"
                    }
                }
                return{
                    className: "d-block"
                }
            }
        )
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
        return (<div id="filter" className="d-flex alçign-items-baseline">
                        <div className="btn btn-light"
                            onClick={this.hideShowFilter}>
                            <i className="fas fa-filter"></i>
                        </div>
                        <form className={this.state.className}>
                            <div className="form-inline ml-3">
                                <div className="form-group">
                                    <label className="mr-2">
                                        Rating From
                                        <select className="custom-select ml-1" id="startingRating" name="min"  value={this.state.min} onChange={this.minHandleChange}>
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label className="mr-2">
                                        to
                                        <select className="custom-select ml-1" id="endRating" name="max"  value={this.state.max} onChange={this.maxHandleChange}>
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                    </label>
                                </div>
                                <div className="form-group ml-3">
                                   <input type="checkbox"
                                       name="CBtoggleGP"
                                       checked={this.state.displayGooglePlaces}
                                       onChange={this.toggleGooglePlaces}/>
                                   <label className="ml-1">Google Places</label>
                               </div>
                            </div>
                        </form>
                </div> );
    }
}

export default Filter;
