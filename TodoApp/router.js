import React, { Component } from "react";
import { StackNavigator } from "react-navigation"
import Home from "./src/component/home"
import SignUp from "./src/component/signup"
// import Signin from "./src/component/signin"
import setbooking from "./src/component/setbooking"
import tabs from "./src/component/tabs"
import * as firebase from 'firebase'



var config = {
    apiKey: "AIzaSyDqKEhMJ-_mztRx_imbYs9gwJfJ3aFCgzg",
    authDomain: "example-c1bd0.firebaseapp.com",
    databaseURL: "https://example-c1bd0.firebaseio.com",
    projectId: "example-c1bd0",
    storageBucket: "example-c1bd0.appspot.com",
    messagingSenderId: "976242645286"
};
firebase.initializeApp(config);




const RootStack = StackNavigator({
    home: {
        screen: Home
    },

    signup: {
        screen: SignUp
    },


    tabs: {
        screen: tabs
    },


    setbooking: {
        screen: setbooking
    },


},

    {
        initialRouteName: "home",
        navigationOptions: {
            header: null
        }
    })

export default RootStack



