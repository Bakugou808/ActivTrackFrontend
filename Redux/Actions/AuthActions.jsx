import AsyncStorage from "@react-native-community/async-storage";
export const URL = `http://localhost:3000`;

export const headers = () => {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
};

// --------AsyncStorage--------

const removeToken = async () => {
  try {
    await AsyncStorage.removeItem("bigT");
    // AsyncStorage.getItem("bigT").then((res) => console.log(res));
  } catch (e) {
    // saving error
    console.log(e);
  }
};

// --------LOG OUT---------  **********

export const logOut = () => {
  removeToken();
  return {
    type: "LOGGING_OUT",
  };
};

// --------RESTORE TOKEN--------  **********

export const restoreToken = (token, userId) => {
  return {
    type: "RESTORE_TOKEN",
    token: token,
    userId: userId,
  };
};

// --------FETCH CURRENT USER--------  **********

export const fetchCurrentUserRequest = () => {
  return {
    type: "FETCH_CURRENT_USER_REQUEST",
  };
};

export const fetchCurrentUserSuccess = (user) => {
  return {
    type: "FETCH_CURRENT_USER_SUCCESS",
    user: user,
  };
};

export const fetchCurrentUserFailure = (error) => {
  return {
    type: "FETCH_CURRENT_USER_FAILED",
    error: error,
  };
};

// --------THUNK FETCH CURRENT USER--------  **********

export const fetchCurrentUser = (token) => {
  const authHeaders = () => {
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: token,
    };
  };
  return (dispatch) => {
    dispatch(fetchCurrentUserRequest());
    fetch(`${URL}/authorize`, {
      headers: authHeaders(),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch(fetchCurrentUserFailure(data.error));
        } else {
          dispatch(fetchCurrentUserSuccess(data));
        }
      });
  };
};
