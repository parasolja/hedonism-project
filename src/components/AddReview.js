/*
 * Component to add new review
 */

import React, { Component } from 'react';

class AddReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            review: '',
            rating: 'Choose Rating...',
            errors: {}
        };

        this.handleReviewChange = this.handleReviewChange.bind(this);
        this.handleRatingChange = this.handleRatingChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //review editing
    handleReviewChange(event) {
        this.setState({review: event.target.value});
    }

    //rating selection
    handleRatingChange(event) {
        this.setState({rating: event.target.value});
    }

    //validate form input
    handleValidation(){
        let errors = {};
        let formIsValid = true;

        if(this.state.review === ''){
          formIsValid = false;
          errors.review = "Review cannot be empty";//display error
        }

        if(this.state.rating === 'Choose Rating...'){
          formIsValid = false;
          errors.rating = "Rating cannot be empty";//display error
        }

        this.setState({errors: errors});
        return formIsValid;
    }

    //submit new review
    handleSubmit(event) {
        event.preventDefault();
        //if form not valid, do nothing
        if(!this.handleValidation()){
            return;
        }

        this.props.onAddReview({
            id: this.props.id,
            review: this.state.review,
            rating: this.state.rating
        });

        this.setState({
            review: '',
            rating: 0
        });

    }

    render() {
        return (
            <form className="mt-2" onSubmit={this.handleSubmit}>
                <div className="form-group mb-1">
                    <select className="custom-select" id="Rating" name="rating"  value={this.state.rating} onChange={this.handleRatingChange}>
                        <option value="Choose Rating...">Choose Rating...</option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <div className="text-left" >
                        <small style={{color: "red"}}>
                            {this.state.errors["rating"]}
                        </small>
                    </div>
                </div>
                <div className="form-group">
                    <textarea  className="form-control" placeholder="Please write your feedback." value={this.state.review} onChange={this.handleReviewChange} />
                    <div className="text-left" >
                        <small className="text-left" style={{color: "red"}}>
                        {this.state.errors["review"]}
                        </small>
                    </div>
                </div>
                <input  className="form-control btn btn-primary btn-sm mb-2"  type="submit" value="Submit Review" />
            </form>
        );
    }
}

export default AddReview;
