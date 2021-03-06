import React from "react";
import {Grid} from '@material-ui/core';
import Background from './img/hedonism.jpg';
import {Typography} from '@material-ui/core';
import { Button } from '@material-ui/core';

const sectionStyle = {
  height: "100vh",
  color: 'white',
  padding: '50px',
  backgroundImage:
  `url(${Background})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

const Header = () => {
  return (
    <Grid style={sectionStyle}
        container
        direction="column"
        justify="space-evenly"
        alignItems="center"
        margin="50px"
    >
      <Grid item>
        <Typography variant="h1">
          Find the best restaurants in your area
        </Typography>
        <Button 
        
        style={{
      
          borderColor: '#fff',
          color: "#fff",
          padding: "18px 36px",
          fontSize: "18px",
          marginTop: '50px'}}
        variant="outlined" >
          Discover
        </Button>
      </Grid>
    </Grid>
  );
};
export default Header;
