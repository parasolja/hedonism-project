import React, {Component} from 'react';

import MapContainer from './components/MapContainer';
import {withGoogleMap, withScriptjs, GoogleMap, Marker}
    from 'react-google-maps';
import {compose, withProps, withHandlers, withState} from 'recompose';
import RestaurantsList from './components/RestaurantsList';
import Filter from './components/Filter';
import AddRestaurant from './components/AddRestaurant';
import {averageRatings, find} from './components/lib';
import restaurants from './components/restaurants';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            min: 0,
            max: 5,
            restaurants: restaurants,
            currentPosition: '',
            displayAddRestaurantForm: false,
            newRestaurantLocation: {},
            displayGooglePlaces: true,
            googlePlaces: [],
            nearbyGooglePlaces: []

        };



        this.handleAddGooglePlaces = this.handleAddGooglePlaces.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.inRange = this.inRange.bind(this);
        this.handleAddReview = this.handleAddReview.bind(this);
        this.getUserPosition = this.getUserPosition.bind(this);
        this.handleDisplayAddRestaurant =
            this.handleDisplayAddRestaurant.bind(this);
        this.handleAddRestaurant = this.handleAddRestaurant.bind(this);
        this.fetchGooglePlaces = this.fetchGooglePlaces.bind(this);
        this.getGooglePlaces = this.getGooglePlaces.bind(this);

    }

    // save the user location
    getUserPosition(position) {
        const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        // find near restaurants
        this.fetchGooglePlaces(pos.lat, pos.lng);
        this.setState({currentPosition: pos});
    }

    // get user location when app load
    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => this.getUserPosition(position)
            );
            // smells like exception handling would be appropriate here
        } else {
            // think of that scenario: no map and restaurant
            // data should not be shown in the bar left, an
            // alert like the one below is to "intrusive" ;)
            alert('Please enable device location, and restart.');
        }
    };

    // use Google Place api with nearbySearch



    fetchGooglePlaces(lat, lng) {
        let currentLocation;
        let service;
        let request;
        let placesInfo;
        let finalPlace;
        try {
            currentLocation = new window.google.maps.LatLng(lat, lng);
            request = {
                location: currentLocation,
                radius: '5000',
                type: ['cafe']
            };
            service = new window.google.maps.places.PlacesService(document.getElementById('map'));
            service.nearbySearch(request, this.getGooglePlaces);
            console.log('big success');
        } catch (err) {
            console.log('error google places api:');
            console.log(err.message);
        }
    }

    // push the google places restaurants to the restaurants list
    getGooglePlaces(results, status) {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
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
                ro.lng=r.geometry.location.lng;
                ro.ratings=[{stars: r.rating, comment: ''}];
                restaurants.push(ro);
                this.handleAddGooglePlaces(ro);
            }
        } else {
            console.log('request status:');
            console.log(window.google.maps.places.PlacesServiceStatus);
        }
    }

    // define if restaurant match the filter
    inRange(restaurant) {
        // the filter settings
        const min = this.state.min;
        const max = this.state.max;
        const toggleGP = this.state.displayGooglePlaces;

        // check the match of restaurant and the filter settings
        if (toggleGP===true) {
            return ((averageRatings(restaurant) >= min)
                &&(averageRatings(restaurant) <= max));
        }
        return ((averageRatings(restaurant) >= min)
            &&(averageRatings(restaurant) <= max)
            && (restaurant.isGooglePlaces===toggleGP));
    }

    // gettting the filter of the filterring form
    handleFilter(filterInput) {
        this.setState(filterInput);
    }

    // add new review to a restaurant
    handleAddReview(input) {
        this.setState((prevState) => {
            const restaurants = this.state.restaurants;
            const i = find(input.id, restaurants);
            restaurants[i].ratings.push({
                'stars': input.rating,
                'comment': input.review
            });
            if (restaurants[i].isGooglePlaces) {
                restaurants[i].user_ratings_total++;
            }
            return {restaurants};
        });
    }

    // display and hide the form to add new restaurant
    handleDisplayAddRestaurant(input) {
        this.setState((prevState) => {
            return {
                displayAddRestaurantForm: !prevState.displayAddRestaurantForm,
                newRestaurantLocation: input
            };
        });
    }

    // add new restaurant
    handleAddRestaurant(restaurant) {
        restaurant.id = new Date().getTime();
        this.setState((prevState) => {
            const restaurants = prevState.restaurants;
            restaurants.push(restaurant);
            return {displayAddRestaurantForm: !prevState.displayAddRestaurantForm,
                restaurants};
        });
    }

    handleAddGooglePlaces(googlePlaceNearby) {
        this.setState((prevState) => {
            const googlePlaces = prevState.googlePlaces;
            googlePlaces.push(googlePlaceNearby);
            return googlePlaceNearby;
        });
    }


    render() {
        return (
            <div className="App">
                <Filter onFilter={this.handleFilter}/>
                <MapContainer
                    userPosition={this.state.currentPosition}
                    restaurants={this.state.restaurants}
                    googlePlaces={this.state.googlePlaces}
                    loadingElement={<div style={{height: `100%`}} />}
                    containerElement={<div style={{height: `100vh`, width: `100%`}}/>}
                    mapElement={<div style={{height: `100%`}}/>}
                    onAddRestaurant={this.handleDisplayAddRestaurant}
                />
                {
                    this.state.displayAddRestaurantForm &&
                    <AddRestaurant onAddRestaurant={this.handleAddRestaurant}
                                   location={this.state.newRestaurantLocation}
                    />
                }
                <RestaurantsList
                    restaurants={this.state.restaurants.filter(this.inRange)}
                    onAddReview={this.handleAddReview}
                />
            </div>
        );
    }
}

export default App;
