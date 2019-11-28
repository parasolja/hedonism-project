/*
 * Component to display restaurant icon on the map
 */

import React from 'react';
import { Marker, InfoWindow } from 'react-google-maps';
import logo from './img/Icon.png';
import { Stars } from './Stars';
// import food from './img/food.png';


export default class RestaurantMarker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.renderInfoWindow = this.renderInfoWindow.bind(this);
  }

  // open and close infoWindow details when clicking marker
  handleToggleOpen = () => {
    this.setState((prevState) => {
      return {isOpen: !prevState.isOpen};
    });
  };

  renderInfoWindow() {
    // build infoWindow
    let iwElements = [];
    let restaurant = this.props.restaurant;

    //get StreetView image for the location

    let srcStreetView = 'https://maps.googleapis.com/maps/api/streetview?size=240x120&location=' + restaurant.lat + ',' + restaurant.lng + '&heading=151.78&pitch=-0.76&key=AIzaSyBD_uTIPdMgOPDnkHHwwn-Izd5BmESpmH0';
    iwElements.push(<div>
                <img
                    src= {srcStreetView}
                    alt={restaurant.name}
                  />
                </div>);


    if (!restaurant.isGooglePlaces
      || (restaurant.isGooglePlaces && (restaurant.ratings.length === 1)))
    {
      for (let i = 0; i < restaurant.ratings.length; i++) {
        iwElements.push(<div style={{ color: '#EC9720' }} className="text-left mt-2">
                        <Stars rating={restaurant.ratings[i].stars}/></div>);
        iwElements.push(<div className="text-left"> {
                          !this.props.restaurant.isGooglePlaces &&
                            '' + restaurant.ratings[i].comment + ''
                          } </div>);
      }
    }

    if (restaurant.isGooglePlaces && (restaurant.ratings.length > 1))
    {
      iwElements.push(<div style={{ color: '#EC9720' }} className="text-left mt-2">
                      <Stars rating={restaurant.ratings[0].stars}/>
                      </div>);
      for (let i = 1; i < restaurant.ratings.length; i++) {
        iwElements.push(<div style={{ color: '#EC9720' }} className="text-left mt-2">
                        <Stars rating={restaurant.ratings[i].stars}/>
                        </div>);
        iwElements.push(<div className="text-left"> {
                          '' + restaurant.ratings[i].comment + ''
                          } </div>);

      }
    }

    return iwElements;
  };

  render() {
    return (
        <Marker
          key={this.props.restaurant.id}
          position={this.props.position}
          onClick={this.handleToggleOpen}
          icon={{
              url: logo,
              scaledSize: new window.google.maps.Size(25, 25),
            }}
        >

        {
          this.state.isOpen &&
            <InfoWindow onCloseClick={this.handleToggleOpen}>
              <div>
                <h6>{this.props.restaurant.name}</h6>

                {
                  this.renderInfoWindow()
                }
              </div>
            </InfoWindow>
        }
        </Marker>


    );
  }
}
