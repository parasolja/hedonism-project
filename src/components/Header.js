import React from 'react';
import main from './img/header.png';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },

}));

  export default function Header () {
    const classes = useStyles();
    return (
    <div className={classes.root}>
        <img src={main} alt='mainPhoto' id='header' height='700px' width='1300'/>
    </div>
  );
}
