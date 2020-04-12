import React from 'react';
import { Stars } from './Stars';
import { averageRatings } from './lib';
import clsx from 'clsx';
import AddReview from './AddReview';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles (theme => ({
  card: {
    minWidth: 20,
  },
  title: {
    fontSize: 14,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: '',
  },
  pos: {
    marginBottom: 12,
  },
}));

function Restaurant(props) {
  const {id, lat, lng, name, address} = props.restaurant;
  let avgRtg = averageRatings(props.restaurant);
  let comments = props.restaurant.ratings.map (function (ratings){
    return(<div key='key'>
              <span style={{color:"#EC9720"}}>
                <Stars
                   rating={ratings.stars}
                   className="fas fa-star"
                   numberOfStars={5}
                   name='rating'
                   key='key'
                />
              </span>
              <Typography variant="body2"
                          component="p">
                {ratings.comment}
              </Typography>
            </div>);
  });


    //restaurant reviewing
  const handleAddReview = input => {
        props.onAddReview(input);
    }

  const [expanded, setExpanded] = React.useState(false);
  const classes = useStyles();



  function handleExpandClick() {
       setExpanded(!expanded);
     }

        return (
            <Card className={classes.card}>
              <CardContent>
                {
                    props.restaurant.isGooglePlaces &&
                    <small className="googlePlaces">Google Places</small>
                }

                  <h4>{name}</h4>
                          <Typography variant="body2"
                            component="p">{address}
                            </Typography>

                    <span style={{ display: 'inline-block', width: '25px' }}>{avgRtg}
                    </span>
                    <span
                          key={props.restaurant.id}
                          style={{color:"#EC9720"}}>
                            <Stars rating={avgRtg} />
                    </span>
                    <span>
                        ({!props.restaurant.isGooglePlaces &&
                            props.restaurant.ratings.length}
                         {props.restaurant.isGooglePlaces &&
                            props.restaurant.user_ratings_total}
                        )
                    </span>



                </CardContent>
                <CardActions>
                  <Button onClick={handleExpandClick}
                          variant="outlined" color="primary"
                          className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                            })}
                          aria-expanded={expanded}
                          aria-label="Reviews">Reviews
                   </Button>
                </CardActions>
                  <Collapse in={expanded}
                          timeout="auto"
                          unmountOnExit>
                <CardContent>
                    <Typography paragraph>{comments}</Typography>
                    <AddReview id={id} onAddReview={handleAddReview} />
                </CardContent>
              </Collapse>
            </Card>

        );
    }


export default Restaurant;
