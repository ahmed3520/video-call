import React,{useContext, useEffect, useState} from 'react';
import { Typography, AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import firebase from 'firebase'
import {Route, Routes, Redirect} from 'react-router-dom'

import Wrapper from './components/Wrapper'
import { SocketContext } from './Context';
import Signin from './components/Signin';
import Signup from './components/Signup';


const useStyles = makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 100px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '600px',
    border: '2px solid black',

    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
  image: {
    marginLeft: '15px',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
}));

const App = () => {
  const user = firebase.auth().currentUser;
const {token} = useContext(SocketContext);
console.log(user);
return(
  <>
  <Routes>
    <Route exact path='/' render={rProps=> user === null? <Signin/>:<Wrapper/>}/>
    <Route exact path='/signin' component={Signin}/>
    <Route exact path ='/signup' component={Signup}/>
  </Switch>
  </>
)
};

export default App;
