import AsyncStorage from "@react-native-community/async-storage";

const URL = `http://localhost:3000`;

export const headers = () => {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
};

// --------AsyncStorage--------

const storeToken = async (user) => {
  try {
    await AsyncStorage.setItem("bigT", user.jwt);
    // AsyncStorage.getItem("bigT").then((res) => console.log(res));
  } catch (e) {
    // saving error
    console.log(e);
  }
};

// --------LOGIN---------  **********

export const loginUserRequest = () => {
  return {
    type: "LOGIN_USER_REQUEST",
  };
};

export const loginUserSuccess = (user) => {
  return {
    type: "LOGIN_USER_SUCCESS",
    user: user,
  };
};

export const loginUserFailure = (error) => {
  return {
    type: "LOGIN_USER_FAILURE",
    error: error,
  };
};
// --------THUNK LOGIN--------

export const loginUser = (userData) => {
  return (dispatch) => {
    dispatch(loginUserRequest());
    fetch(`${URL}/login`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((user) => {
        if (user.error) {
          dispatch(loginUserFailure(user.error));
        } else {
          storeToken(user);
          dispatch(loginUserSuccess(user));
        }
      });
  };
};

// --------SIGNUP---------  **********

export const signUpUserFailure = (error) => {
  return {
    type: "SIGN_UP_USER_FAILURE",
    error: error,
  };
};

export const signUpUserRequest = () => {
  return {
    type: "SIGN_UP_USER_REQUEST",
  };
};

export const signUpUserSuccess = (user) => {
  return {
    type: "SIGN_UP_USER_SUCCESS",
    user: user,
  };
};

// --------THUNK SIGNUP--------  **********

export const signUpUser = (userData) => {
  return (dispatch) => {
    dispatch(signUpUserRequest());
    fetch(`${URL}/users`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((user) => {
        if (user.error) {
          dispatch(signUpUserFailure(user.error));
        } else {
          storeToken(user);
          dispatch(signUpUserSuccess(user));
        }
      });
  };
};
