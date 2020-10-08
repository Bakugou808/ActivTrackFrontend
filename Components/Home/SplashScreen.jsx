import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View } from "react-native";

export const SplashScreen = () => {
  return (
    <View>
      <Text>SPLASH PAGE... THINGS ARE LOADING...</Text>
    </View>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
