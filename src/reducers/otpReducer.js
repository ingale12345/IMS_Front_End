import * as actions from "../actions/actionTypes";
export const otpReducer = (state = { otpStatus: "", email: "" }, action) => {
  switch (action.type) {
    case actions.GENERATE_OTP:
      console.log(action.payload.otpStatus);
      return {
        ...state,
        otpStatus: action.payload.otpStatus,
        email: action.payload.email,
      };

    default:
      return state;
  }
};
