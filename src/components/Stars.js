/*
 * Component to display ration in stars
 */

import React from 'react'

const Stars = (props) => {

    let output = [];

    // Append all the filled whole stars
    for (var i = props.rating; i >= 1; i--)
        output.push(<i className="fas fa-star" aria-hidden="true"></i>);

    // If there is a half a star, append it
    if ((i > 0) && (i<1)) output.push(<i className="fas fa-star-half-alt" aria-hidden="true"></i>);

    // Fill the empty stars
    for (let i = (5 - props.rating); i >= 1; i--)
        output.push(<i className="far fa-star" aria-hidden="true"></i>);

    return ( output );
}

export {Stars};

