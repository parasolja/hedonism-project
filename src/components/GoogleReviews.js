import React, {  Component } from 'react';
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
      {
        places.map((place) => {
          if(place.rating >= 1){
            return (
            <div key={place.author_name}>
            <span style={{color:"#EC9720"}}>
              <Stars
                 rating={place.rating}
                 className="fas fa-star"
                 numberOfStars={5}
                 name='rating'

              />

            </span>
            <Typography variant="body2"
                        component="p"
                        style={{paddingBottom:"20px"}}
            >
              {place.text}
            </Typography>
            </div>

          )
          }
        })
      }
  </div>

    );
  }
}
