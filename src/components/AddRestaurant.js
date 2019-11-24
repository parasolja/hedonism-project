/*
 * Component to add new restaurant
 */

import React, { Component } from 'react';

const RESET_VALUES = {id: '', name: '', address: '', isGooglePlaces: false,
        lat: '', lng: '', ratings: [{stars:'Choose Rating...', comment:''}]};

class AddRestaurant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurant: Object.assign({}, RESET_VALUES),
            errors: {},
        };
        console.log("inside constructor:")
        console.log(this.state.restaurant);

        this.handleChange = this.handleChange.bind(this);
        this.handleReviewChange = this.handleReviewChange.bind(this);
        this.handleRatingChange = this.handleRatingChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //hand editing form input
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState((prevState) => {
            prevState.restaurant[name] = value;
            return { restaurant: prevState.restaurant };
        });
    }

    //review editing
    handleReviewChange(event) {
        let restaurant = this.state.restaurant;
        restaurant.ratings[0].comment = event.target.value;
        this.setState({restaurant: restaurant});
    }

    //rating selection
    handleRatingChange(event) {
        let restaurant = this.state.restaurant;
        restaurant.ratings[0].stars = event.target.value;
        this.setState({restaurant: restaurant});
    }

    //validate form input
    handleValidation(){
        let restaurant = this.state.restaurant;
        let errors = {};
        let formIsValid = true;

        if(restaurant.name === ''){
          formIsValid = false;
          errors.name = "Restaurant name cannot be empty";//display error
        }

        if(restaurant.address === ''){
          formIsValid = false;
          errors.address = "Restaurant address cannot be empty";//display error
        }

        if(restaurant.ratings[0].comment === ''){
          formIsValid = false;
          errors.comment = "Product price cannot be empty";//display error
        }

        if(restaurant.ratings[0].stars === 'Choose Rating...'){
            formIsValid = false;
            errors.rating = "Rating cannot be empty";//display error
          }

        this.setState({errors: errors});
        return formIsValid;
      }

    //submit new restaurant
    handleSubmit(event) {
        event.preventDefault();
        //if form not valid, do nothing
        if(!this.handleValidation()){
            return;
         }
        this.props.onAddRestaurant(this.state.restaurant);
        this.setState({ restaurant: Object.assign({}, RESET_VALUES) });
    }

    //save the location got from Google Maps
    componentDidMount(){
        let restaurant = this.state.restaurant;
        restaurant.ratings = [{stars:'Choose Rating...',comment:''}]
        restaurant.lat = this.props.location.lat;
        restaurant.lng = this.props.location.lng;
        this.setState(
            {restaurant: restaurant}
          );
    }

    render() {
        return (
            <div id="add-restaurant" >
                <h5 className="text-left">Add New Restaurant</h5>
                <form className="mt-3" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input type="text" className="form-control"
                            id="name" name="name"  value={this.state.restaurant.name}
                            onChange={this.handleChange}
                            placeholder="Restaurant Name"/>
                        <div className="text-left" >
                            <small style={{color: "red"}}>
                                {this.state.errors["name"]}
                            </small>
                        </div>
                    </div>
                    <div className="form-group">
                        <textarea className="form-control"
                            name="address"  value={this.state.restaurant.address}
                            onChange={this.handleChange}
                            placeholder="Restaurant Address" rows="2">
                        </textarea>
                        <div className="text-left" >
                            <small style={{color: "red"}}>
                                {this.state.errors["address"]}
                            </small>
                        </div>
                    </div>
                    <div className="form-group">
                        <select className="custom-select" name="rating"  value={this.state.restaurant.ratings[0].stars} onChange={this.handleRatingChange}>
                            <option value="Choose Rating...">Choose Rating...</option>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <div className="text-left" >
                            <small className="text-left" style={{color: "red"}}>
                            {this.state.errors["rating"]}
                            </small>
                        </div>
                </div>
                <div className="form-group mb-4">
                    <textarea  className="form-control" placeholder="Please write your feedback." value={this.state.restaurant.ratings[0].comment} onChange={this.handleReviewChange} />
                    <div className="text-left" >
                        <small className="text-left" style={{color: "red"}}>
                        {this.state.errors["comment"]}
                        </small>
                    </div>
                </div>
                    <input  className="form-control btn btn-primary btn-sm mb-2"  type="submit"
                    value="Submit" />
                </form>
            </div>
        );
    }
}

export default AddRestaurant;
