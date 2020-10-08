import "react-native-gesture-handler";
import AsyncStorage from "@react-native-community/async-storage";

import React, { useState, useEffect } from "react";
// react-native
import { StyleSheet, Text, View, ActivityIndicator } from "react-native"; //* View is similar to a <div>, Text is for when you're displaying text, StyleSheet allows you to create a stylesheet object with the StyleSheet.create method for style classes
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// redux
import { connect } from "react-redux";
// component imports
import LoginScreen from "./Signup/LoginScreen";
import SignUpScreen from "./Signup/SignUpScreen";
import HomeScreen from "./Home/HomeScreen";
// action imports
import { fetchCurrentUser, restoreToken } from "../Redux/Actions/AuthActions";

const Stack = createStackNavigator();

function Container(props) {
  const { isLoggedIn, onRestoreToken, isLoading, onCheckUser } = props;

  useEffect(() => {
    const boostrapAsync = async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem("bigT");
      } catch (e) {
        console.log(e);
      }
      onRestoreToken(userToken);
      onCheckUser(userToken);
    };
    boostrapAsync();
  }, []);

  if (isLoading) {
    return (
      <ActivityIndicator
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      />
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Sign Up" component={SignUpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const mapStateToProps = (store) => ({
  isLoggedIn: store.authorized.isLoggedIn,
  userToken: store.authorized.token,
  isLoading: store.authorized.isLoading,
  user: store.authorized.user,
});

const mapDispatchToProps = (dispatch) => ({
  onCheckUser: (token) => dispatch(fetchCurrentUser(token)),
  onRestoreToken: (token) => dispatch(restoreToken(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
