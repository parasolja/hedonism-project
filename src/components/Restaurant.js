import React, { useState } from 'react';
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
    minWidth: 200,
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
  let avgRtg = averageRatings(props.restaurant);
  let comments = props.restaurant.ratings.map (function(ratings){
    return(<div>
              <Stars
                 rating={ratings.stars}
                 className="fas fa-star"
                 numberOfStars={5}
                 name='rating'
              />
              <Typography variant="body2" component="p">{ratings.comment}
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
                    <small className="google-places">Google Places</small>
                }
                <h4>{props.restaurant.name}</h4>
                <Typography variant="body2" component="p">{props.restaurant.address}</Typography>


                    <span style={{ display: 'inline-block', width: '1.5rem' }} className="mr-1">{avgRtg}
                    </span>
                    <span className="mr-1" key={props.restaurant.id}><Stars rating={avgRtg}/></span>
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
                          aria-label="Reviews">Ratings
                   </Button>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                   <CardContent>

                  <Typography paragraph>{comments}</Typography>


                <AddReview id={props.restaurant.id} onAddReview={handleAddReview} />

                  </CardContent>
                  </Collapse>
              </Card>

        );
    }


export default Restaurant;
