export const AUTH_BEGIN   = 'AUTH_BEGIN';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const authBegin = () => ({
  type: AUTH_BEGIN
});

export const authSuccess = auth => ({
  type: AUTH_SUCCESS,
  payload: { auth }
});

export const authFailure = error => ({
  type: AUTH_FAILURE,
  payload: { error }
});

export const logoutSuccess = auth => ({
  type: LOGOUT_SUCCESS,
  payload: { auth }
});
