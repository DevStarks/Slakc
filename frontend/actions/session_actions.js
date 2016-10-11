export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const SIGNUP = "SIGNUP";
export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const CLEAR_SESSION_ERRORS = "CLEAR_SESSION_ERRORS";
export const CHECK_USERNAME = "CHECK_USERNAME";
export const STORE_TEMP_USER = "STORE_TEMP_USER";

export const login = user => ({
  type: LOGIN,
  user
});

export const logout = () => ({
  type: LOGOUT,
});

export const signup = user => ({
  type: SIGNUP,
  user
});

export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

export const receiveSessionErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

export const clearSessionErrors = () => ({
  type: CLEAR_SESSION_ERRORS
});


export const checkUsername = username => ({
  type: CHECK_USERNAME,
  username
});

export const storeTempUser = tempUser => ({
  type: STORE_TEMP_USER,
  tempUser
});
