import React from 'react';
import main from './img/header.jpg';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


const Header = () =>
  <div>
    <header>
    <h1> Hedonism </h1>
      <img src={main} alt='mainPhoto' id='header' height='600px'/>
    </header>
  </div>;

export default Header;
