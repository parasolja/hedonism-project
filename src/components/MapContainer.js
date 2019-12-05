import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import RestaurantMarker from './RestaurantMarker';
import restaurants from './restaurants';
import homeIcon from './img/homeIcon.png';
import logo from './img/Icon.png';
import food from './img/food.png';

const RestaurantsMap = withGoogleMap((props) => {

        const markers = restaurants.map( restaurant =>
            <RestaurantMarker
                key={restaurant.id}
                id={restaurant.id}
                restaurant={restaurant}
                icon={{
                    url: logo,
                    scaledSize: new window.google.maps.Size(25, 25),
                }}
                position={{ lat: restaurant.lat,
                    lng: restaurant.lng,
                }}
            />);


        const googlePlaceMarkers = props.googlePlaces.map( googlePlaceNearby  =>
            <RestaurantMarker
                key={googlePlaceNearby.key}
                id={googlePlaceNearby.id}
                restaurant={googlePlaceNearby}
                icon={{
                    url: food,
                    scaledSize: new window.google.maps.Size(25, 25),
                }}
                position={{ lat: googlePlaceNearby.lat,
                    lng: googlePlaceNearby.lng,
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
                defaultZoom={15}
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
                {googlePlaceMarkers}
            </GoogleMap>
        );
    }
)

export default RestaurantsMap;
