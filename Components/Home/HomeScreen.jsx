import React, { useEffect } from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View, Button } from "react-native";
// action imports
import { logOut } from "../../Redux/Actions/AuthActions";

// component imports
import { AuthContext } from "../Context/context";

export const HomeScreen = (props) => {
  const { user, onLogOut } = props;
  // const { signOut } = React.useContext(AuthContext);

  useEffect(() => {}, []);

  return (
    <View>
      <Text>Welcome {user.username}. This is the HomeScreen </Text>
      <Button onPress={() => onLogOut()} title="Sign Out" />
    </View>
  );
};

const mapStateToProps = (store) => ({
  user: store.user.user,
});

const mapDispatchToProps = (dispatch) => ({
  onLogOut: () => dispatch(logOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
