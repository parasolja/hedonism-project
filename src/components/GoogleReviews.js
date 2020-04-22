import React, { useState, useEffect, Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { Stars } from './Stars';

export default class GoogleReviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [],
    }
  }

  componentDidMount() {
    let map = new window.google.maps.Map(document.getElementById("map"));
    let service = new window.google.maps.places.PlacesService(document.getElementById('map'));
    service.getDetails({
      placeId: this.props.place_id
    }, (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          console.log(place.reviews);
          this.setState({places: place.reviews})
        }
    })
  }

  render() {
    const { places } = this.state;
    return (
      <div>
    <p>
      {
        places.map((place) => {
          if(place.rating >= 1){
            return <p key={place.author_name}>{place.rating}{place.text}</p>
          }
        })
      }
    </p>
  </div>

    );
  }
}
