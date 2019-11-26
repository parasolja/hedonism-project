
import React, { useState, setState } from 'react';


export default function AddReview(props) {
  const [review, handleReviewChange] = useState('');
  const [rating, handleRatingChange] = useState('');
  const [errors] = useState({});

  const handleSubmit = (event) => {
      event.preventDefault();
      //if form not valid, do nothing

      props.onAddReview({
          id: props.id,
          review: review,
          rating: rating
      });

}

        return (
            <form className="mt-2" onSubmit={handleSubmit}>
                <div className="form-group mb-1">
                    <select className="custom-select" id="Rating" name="rating"  value={rating} onChange={event => handleRatingChange(event.target.value)}>
                        <option value="Choose Rating...">Choose Rating...</option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>s
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div className="form-group">
                    <textarea  className="form-control" placeholder="Please write your feedback." value={review} onChange={event => handleReviewChange(event.target.value)} />

                </div>
                <input  className="form-control btn btn-primary btn-sm mb-2"  type="submit" value="Submit Review" />
            </form>
        );
    };
