/*
 * Class with usual functions
 */

//function to display StreetView image
let streetViewLink = function(lat, lng){
    return '<div><img src="https://maps.googleapis.com/maps/api/streetview?size=240x120&location=' + lat + ',' + lng + '&heading=151.78&pitch=-0.76&key=AIzaSyBD_uTIPdMgOPDnkHHwwn-Izd5BmESpmH0" alt="' + '"></div>';
}

//function to calculate the average rating
let averageRatings = function(restaurant){
    let sum = 0, ratingNum = 0, avg = 0, i = 0;
    if(!restaurant.isGooglePlaces){
        ratingNum = restaurant.ratings.length;
        for( i = 0; i < ratingNum; i++ ){
            sum += parseInt( restaurant.ratings[i].stars, 10 ); //don't forget to add the base
        }
        avg = sum/ratingNum;
        return Math.round( avg * 10 ) / 10;
    }

    if(restaurant.isGooglePlaces && (restaurant.ratings.length === 1)){
        return restaurant.ratings[0].stars;
    }

    ratingNum = restaurant.user_ratings_total
                    + restaurant.ratings.length - 1;
    console.log('rating num: '+ ratingNum);
    for( i = 1; i < restaurant.ratings.length; i++ ){
        sum += parseInt( restaurant.ratings[i].stars, 10 ); //don't forget to add the base
    }
    let gpRating = restaurant.ratings[0].stars;
    let sumGpRatings = gpRating * restaurant.user_ratings_total;
    avg = (sum + sumGpRatings)/ratingNum;
    return Math.round( avg * 10 ) / 10;

}

//function to find the index of an object in an array, by id value
let find = function(nameKey, xarray){
    for (var i = 0; i < xarray.length; i++) {
        if (xarray[i].id === nameKey) {
            return i;
        }
    }
}


export {streetViewLink, averageRatings, find};
