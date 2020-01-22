import {
  AUTH_BEGIN,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  LOGOUT_SUCCESS
} from "./actions";

const initialState = {
  pseudo: localStorage.getItem("pseudo"),
  budget: 0,
  auth: false,
  loading: false,
  error: null
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null
      };

    case AUTH_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        loading: false,
        auth: true
      };

    case AUTH_FAILURE:
      // The request failed. It's done. So set loading to "false".
      // Save the error, so we can display it somewhere.
      // Since it failed, we don't have items to display anymore, so set `items` empty.
      //
      // This is all up to you and your app though:
      // maybe you want to keep the items around!
      // Do whatever seems right for your use case.
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    case LOGOUT_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        loading: false,
        auth: false
      };
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
