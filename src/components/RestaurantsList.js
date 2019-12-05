/*
 * Component to display the list of restaurants
 */
import React, { Component } from 'react';
import Restaurant from './Restaurant';


class RestaurantsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shown: true,
            display:"block",
            position: "right"
        }
        this.handleAddReview = this.handleAddReview.bind(this);
        this.hideShowList = this.hideShowList.bind(this);

    }



    //for button show/hide restaurants list
    hideShowList(){
        this.setState((prevState)=>{
            let shown = !prevState.shown;
            let display = "block";
            if(shown){
                display = "block";
            } else {
                display = "none";
            }
            return{
                shown: shown,
                display: display
            }
        }
        )
    }

    handleAddReview(input) {
        this.props.onAddReview(input);
    }


    render() {
        return (
            <div>
                <div id="restaurants-list">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="text-left">
                            <h5>Restaurants</h5>
                        </div>

                        <div className="btn btn-light"
                            onClick={this.hideShowList}>
                            <i className="fas fa-list"></i>
                        </div>
                    </div>
                    <ul style={{display:this.state.display}} >
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
