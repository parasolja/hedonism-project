import React from "react";
import {Grid} from '@material-ui/core';
import Background from './img/hedonism.jpg';

const sectionStyle = {
  height: "100vh",

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
    >
      <Grid item>
      </Grid>
    </Grid>
  );
};
export default Header;
