
import React, { useState, setState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';



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

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);


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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 110,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const classes = useStyles();

        return (
          <div>
            <form className={classes.root}
                  noValidate autoComplete="off"
                  onSubmit={handleSubmit}>
                <div>
                    <FormControl className={classes.root} onSubmit={handleSubmit} >
                      <InputLabel id="demo-simple-select-label">Add your rating...</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="Rating"
                        name='rating'
                        value={rating}
                        onChange={onChange}
                      >
                          <MenuItem value='1'>1</MenuItem>
                          <MenuItem value='2'>2</MenuItem>
                          <MenuItem value='3'>3</MenuItem>
                          <MenuItem value='4'>4</MenuItem>
                          <MenuItem value='5'>5</MenuItem>
                      </Select>
                    </FormControl>
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
          </div>
        );

    };

export default AddReview
