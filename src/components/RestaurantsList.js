/*
 * List of restaurants
 */
import React, { Component } from 'react';
import Restaurant from './Restaurant';



class RestaurantsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shown: true,
        }

        this.handleAddReview = this.handleAddReview.bind(this);
    }


    handleAddReview(input) {
        this.props.onAddReview(input);
    }


    render() {
        return (
            <div>
                <div className="restaurantList">
                    <div>
                         <h2>
                            Restaurants
                        </h2>
                    </div>
                    <ul>
                        {this.props.restaurants.sort(this.compare)
                            .map(
                                (item) =>  <Restaurant key={item.id} id={item.id}restaurant={item} onAddReview={this.handleAddReview} />
                            )}
                    </ul>
                </div>
            </div>
        );
    }
}

export default RestaurantsList;
