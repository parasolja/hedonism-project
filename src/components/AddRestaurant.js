import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';



const RESET_VALUES = {id: '', name: '', address: '', isGooglePlaces: false,
        lat: '', lng: '', ratings: [{stars:'Choose Rating...', comment:''}]};

class AddRestaurant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurant: Object.assign({}, RESET_VALUES),
            errors: {},
        };
        console.log(this.state.restaurant);

        this.handleChange = this.handleChange.bind(this);
        this.handleReviewChange = this.handleReviewChange.bind(this);
        this.handleRatingChange = this.handleRatingChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addRestaurantCard = this.addRestaurantCard.bind(this);
    }

    //hand editing form input
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState((prevState) => {
            prevState.restaurant[name] = value;
            return { restaurant: prevState.restaurant };
        });
    }

    //review editing
    handleReviewChange(event) {
        let restaurant = this.state.restaurant;
        restaurant.ratings[0].comment = event.target.value;
        this.setState({restaurant: restaurant});
    }

    //rating selection
    handleRatingChange(event) {
        let restaurant = this.state.restaurant;
        restaurant.ratings[0].stars = event.target.value;
        this.setState({restaurant: restaurant});
    }

    //validate form input
    handleValidation(){
        let restaurant = this.state.restaurant;
        let errors = {};
        let formIsValid = true;

        if(restaurant.name === ''){
          formIsValid = false;
          errors.name = "Restaurant name cannot be empty";//display error
        }

        if(restaurant.address === ''){
          formIsValid = false;
          errors.address = "Restaurant address cannot be empty";//display error
        }

        if(restaurant.ratings[0].comment === ''){
          formIsValid = false;
          errors.comment = "Comment cannot be empty";//display error
        }

        if(restaurant.ratings[0].stars === 'Choose Rating...'){
            formIsValid = false;
            errors.rating = "Rating cannot be empty";//display error
          }

        this.setState({errors: errors});
        return formIsValid;
      }

    //submit new restaurant
    handleSubmit(event) {
        event.preventDefault();
        //if form not valid, do nothing
        if(!this.handleValidation()){
            return;
         }
        this.props.onAddRestaurant(this.state.restaurant);
        this.setState({ restaurant: Object.assign({}, RESET_VALUES) });
    }

    //save the location got from Google Maps
    componentDidMount(){
        let restaurant = this.state.restaurant;
        restaurant.ratings = [{stars:'Choose Rating...',comment:''}]
        restaurant.lat = this.props.location.lat;
        restaurant.lng = this.props.location.lng;
        this.setState(
            {restaurant: restaurant}
          );
    }

  addRestaurantCard(){
    const useStyles = makeStyles(theme => ({
      root: {
        '& > *': {
          margin: theme.spacing(0),
          width: 400,
        },
      },
      title: {
        fontSize: 16,
      },
      pos: {
        marginBottom: 12,
      },
      container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
      },
    }));
    const classes = useStyles();
    const inputLabel = React.useRef(null);

  }

    render() {

        return (
            <div id="add-restaurant">
                <Typography className={this.title} color="textSecondary">Add New Restaurant</Typography>
                <form className={this.root} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                    <div>
                    <TextField
                          required
                          id="outlined-required"
                          name="name"
                          label="Name"
                          className={this.textField}
                          value={this.state.restaurant.name}
                          onChange={this.handleChange}
                          margin="normal"
                          variant="outlined"
                          error={this.state.errors["name"]}
                      />

                    </div>
                    <div className="form-group">
                    <TextField
                          required
                          id="outlined-basic"
                          name="address"
                          variant="outlined"
                          label="Address"
                          defaultValue="Hello World"
                          className={this.textField}
                          value={this.state.restaurant.address}
                          onChange={this.handleChange}
                          margin="normal"
                          error={this.state.errors["address"]}
                      />
                    </div>
                    <div>
                        <FormControl variant="outlined" className={this.root}>
                          <InputLabel ref={this.inputLabel} id="outlined-basic">Your rating</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="Rating"
                              style={{minWidth: 200}}
                              name='rating'
                              value={this.state.restaurant.ratings[0].stars}
                              onChange={this.handleRatingChange}
                              error={this.state.errors["rating"]}
                            >
                                <MenuItem value='1'>1</MenuItem>
                                <MenuItem value='2'>2</MenuItem>
                                <MenuItem value='3'>3</MenuItem>
                                <MenuItem value='4'>4</MenuItem>
                                <MenuItem value='5'>5</MenuItem>
                            </Select>
                        </FormControl>
                        </div>

                <div className="form-group mb-4">
                <TextField
                      required
                      id="outlined-basic"
                      name="address"
                      variant="outlined"
                      label="Your feedback"
                      defaultValue="Hello World"
                      className={this.textField}
                      value={this.state.restaurant.ratings[0].comment}
                      onChange={this.handleReviewChange}
                      margin="normal"
                      error={this.state.errors["comment"]}
                  />
                </div>
                <Button
                  variant="outlined"
                  color="primary"
                  type="submit"
                  value="Submit"
                  onClick>Submit
                </Button>
                </form>
            </div>

        );
    }
}

export default AddRestaurant;
