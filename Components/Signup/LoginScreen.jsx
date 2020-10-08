import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
// action imports
import { loginUser } from "../../Redux/Actions/UserActions";
// component imports

export const LoginScreen = (props) => {
  const { navigation, loginError, onLoginUser } = props;
  const [fields, setFields] = useState({ username: "", password: "" });

  function handleChange(e) {
    let obj = { [e.target.placeholder.toLowerCase()]: e.target.value };
    setFields((prev) => ({ ...prev, ...obj }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLoginUser({ user: { ...fields } });
  }

  function handleRedirect() {
    navigation.navigate("Sign Up", { name: "Sign Up" });
  }
  return (
    <View style={styles.container}>
      <View>
        <TextInput
          underlineColorAndroid={"orange"} //!not doing anything with orange as input
          style={styles.textInput}
          placeholder="Username"
          value={fields.username}
          onChange={handleChange}
          textContentType={"username"}
        />

        <TextInput
          underlineColorAndroid={"orange"} //!not doing anything with orange as input
          style={styles.textInput}
          placeholder="Password"
          value={fields.password}
          onChange={handleChange}
          secureTextEntry={true}
          textContentType={"password"}
        />
        <Button onPress={handleSubmit} color="#48BBEC" title="Login" />
      </View>
      <Text style={[styles.text, styles.signUp]} onPress={handleRedirect}>
        Sign Up
      </Text>
      {loginError && <Text>{loginError}</Text>}
    </View>
  );
};

const mapStateToProps = (store) => ({
  loginError: store.user.error,
});

const mapDispatchToProps = (dispatch) => ({
  onLoginUser: (userData) => dispatch(loginUser(userData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    margin: "20px",
  },
  text: {
    alignItems: "center",
    justifyContent: "center",
  },
  signUp: {
    color: "#48BBEC",
  },

  textInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flexGrow: 1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#48BBEC",
    borderRadius: 8,
    color: "#48BBEC",
  },
});
