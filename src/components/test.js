import React from "react";
import { compose, withProps, withHandlers, withState } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import RestaurantMarker from './RestaurantMarker';
import restaurants from './restaurants';
import homeIcon from './img/homeIcon.png';

const markers = restaurants.map( restaurant =>
              <RestaurantMarker
                  key={restaurant.id}
                  restaurant={restaurant}
                  position={{ lat: restaurant.lat,
                              lng: restaurant.lng,
                            }}
                />);


const RestaurantsMap = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBD_uTIPdMgOPDnkHHwwn-Izd5BmESpmH0&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap,
    withState('places', 'updatePlaces', ''),
    withHandlers(() => {
        const refs = {
            map: undefined,
        }

        return {
            onMapMounted: () => ref => {
                refs.map = ref
            },
            fetchPlaces: ({ updatePlaces }) => {
                let places;
                const bounds = refs.map.getBounds();
                const service = new window.google.maps.places.PlacesService(refs.map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED);
                const request = {
                    bounds: bounds,
                    type: ['restaurant']
                };
                service.nearbySearch(request, (results, status) => {
                    if (status == window.google.maps.places.PlacesServiceStatus.OK) {
                        for (let i = 0; i < results.length; i++) {
                            const jsonp = JSON.stringify(results[i]);
                            const r = JSON.parse(jsonp); // read the google place json
                            let ro = {}; // restaurant object
                            // convert google place to the restaurant format
                            ro.key=r.id;
                            ro.isGooglePlaces=true;
                            ro.name=r.name;
                            ro.rating=r.rating;
                            ro.user_ratings_total=r.user_ratings_total;
                            ro.address=r.vicinity;
                            ro.lat=r.geometry.location.lat;
                            ro.long=r.geometry.location.lng;
                            ro.ratings=[{stars: r.rating, comment: ''}];
                            restaurants.push(ro);
                            this.handleAddGooglePlaces(ro);
                        }
                    } else {
                        console.log('request status:');
                        console.log(window.google.maps.places.PlacesServiceStatus);
                    }
                })
            }
        }
    }),
)((props) => {

    return (
        <GoogleMap
            onTilesLoaded={props.fetchPlaces}
            ref={props.onMapMounted}
            onBoundsChanged={props.fetchPlaces}
            defaultZoom={8}
            defaultCenter={{ lat: 51.508530, lng: -0.076132 }}
        >
            {props.places && props.places.map((place, i) =>
                <Marker key={i} position={{ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }} />
            )}
            {markers}
        </GoogleMap>
    )
})

export default class MyFancyComponent extends React.PureComponent {
    render() {
        return (
            <RestaurantsMap />
        )
    }
}





/*
 * Component of the map
 */

import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import RestaurantMarker from './RestaurantMarker';
import restaurants from './restaurants';
import homeIcon from './img/homeIcon.png';

const RestaurantsMap = withGoogleMap((props) => {

  const markers = restaurants.map( restaurant =>
                <RestaurantMarker
                    key={restaurant.id}
                    restaurant={restaurant}
                    position={{ lat: restaurant.lat,
                                lng: restaurant.lng,
                              }}
                  />);

  //when user click the map, run the props "onAddRestaurant"
  let handleClick = (event) => {
              var lat = event.latLng.lat(),
              lng = event.latLng.lng()
              props.onAddRestaurant({
                lat: lat, lng: lng
              });
            }

  return (
      <GoogleMap
        defaultZoom={10}
        center={ props.userPosition }
        onClick={(e) => handleClick(e)}
        googleMapURL= "https://maps.googleapis.com/maps/api/js?key=AIzaSyBD_uTIPdMgOPDnkHHwwn-Izd5BmESpmH0&libraries=geometry,drawing,places"
        >
         <Marker
          title={"Hi! This is your current location"}
          position={props.userPosition}
          icon={{
                url: homeIcon,
                scaledSize: new window.google.maps.Size(25, 25),
            }}

        >
        </Marker>
        {markers}
      </GoogleMap>
    );
  }
)

export default RestaurantsMap;
