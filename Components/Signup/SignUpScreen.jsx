import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
// action imports
import { signUpUser } from "../../Redux/Actions/UserActions";

export const SignUpScreen = (props) => {
  const { navigation, onSignUpUser } = props;
  const [error, setError] = useState({
    error: false,
    message: "Must Enter Valid Email",
  });

  const [fields, setFields] = useState({
    username: "",
    password: "",
    email: "",
  });

  function handleChange(e) {
    e.target.placeholder.toLowerCase() === "email" &&
      setError((prev) => ({ ...prev, error: false }));
    let obj = { [e.target.placeholder.toLowerCase()]: e.target.value };
    setFields((prev) => ({ ...prev, ...obj }));
    console.log(obj);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(fields);
    if (fields.email.includes("@") && fields.email.includes(".com")) {
      onSignUpUser({ user: { ...fields } });
    } else {
      setError((prev) => ({ ...prev, error: true }));
    }
  }

  function handleRedirect() {
    navigation.navigate("Login", { name: "Login" });
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>I am a SignUp Screen</Text>
      <View>
        <TextInput
          underlineColorAndroid={"orange"} //! not doing anything with orange as input
          style={styles.textInput}
          placeholder="Username"
          value={fields.username}
          onChange={handleChange}
          textContentType={"username"}
        />
        <TextInput
          underlineColorAndroid={"orange"} //!not doing anything with orange as input
          style={styles.textInput}
          placeholder="Email"
          value={fields.email}
          onChange={handleChange}
          textContentType="emailAddress"
        />
        <TextInput
          underlineColorAndroid={"orange"} //! not doing anything with orange as input
          style={styles.textInput}
          placeholder="Password"
          value={fields.password}
          onChange={handleChange}
          secureTextEntry={true}
          textContentType={"password"}
        />
        <Button onPress={handleSubmit} color="#48BBEC" title="Sign Up" />
      </View>
      <Text style={[styles.text, styles.logIn]} onPress={handleRedirect}>
        Login
      </Text>
      {error.error && <Text>{error.message}</Text>}
    </View>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  onSignUpUser: (userData) => dispatch(signUpUser(userData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);

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
  logIn: {
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
