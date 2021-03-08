import React from "react";
import {Grid} from '@material-ui/core';
import Background from './img/hedonism.jpg';
import {Typography} from '@material-ui/core';
import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';


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
  const bottomRef = React.useRef();

  const onClick = () => {
    bottomRef.current.scrollIntoView({behavior: 'smooth'});
  }
  return (
    <div>
    <Grid style={sectionStyle}
        container
        direction="column"
        justify="center"
        alignContent="center"
        alignItems="center"
        margin="50px"
    >
      <Grid item>
        <Typography variant="h2"
        textAlign="center"
        fontWeight="fontWeightBold">
          <Box fontWeight={500} m={1}>
          ALL THE BEST RESTAURANTS IN ONE PLACE
          </Box>
        </Typography>
        <Button 
            onClick={onClick}
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
     <div className="bottomContainerElement" ref={bottomRef}> 
     </div>
      </div>
  );
};
export default Header;
