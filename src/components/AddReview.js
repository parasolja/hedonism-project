
import React, { useState, setState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';



function NewReview() {
  return new Promise(resolve => {
    setTimeout(resolve, 100);
  });
}
const initialState = {
  review: '',
  rating: '',
  handleReviewChange: '',
  handleReviewChange: ''
};

const AddReview = (props) => {

  const [errors] = useState({});
  const [{
    review, rating, handleReviewChange, handleRatingChange
  }, setState ] = useState(initialState);

  const clearState = () => {
    setState({ ...initialState });
  };

  const onChange = e => {
    const {name, value} = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = e => {
      e.preventDefault();
    NewReview().then(clearState);

      props.onAddReview({
          id: props.id,
          review: review,
          rating: rating
      });



}



const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

const classes = useStyles();

        return (
            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <div className="form-group mb-1">
                    <select className="custom-select" id="Rating" name="rating"  value={rating} onChange={onChange}>
                        <option value="Choose Rating...">Choose Rating...</option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div className="form-group">
                    <TextField
                      id="outlined-basic"
                      label="Your feedback"
                      variant="outlined"
                      name='review'
                      value={review}
                      onChange={onChange}
                      />

                </div>
                <Button
                  variant="outlined"
                  color="primary"
                  type="submit"
                  value="Submit Review"
                  onClick>Submit
                </Button>
            </form>
        );

    };

    export default AddReview
