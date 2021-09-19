import { USER_ACTIVATE_SUCCESS, USER_ACTIVATE_REQUEST, USER_ACTIVATE_FAIL, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAIL, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL } from "../constants/user";

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_LOGIN_REQUEST:
        return { loading: true };
      case USER_LOGIN_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case USER_LOGIN_FAIL:
        return { loading: false, error: action.payload };
      case USER_LOGOUT:
        return {};
      default:
        return state;
    }
  };

  export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_REGISTER_REQUEST:
        return { loading: true };
      case USER_REGISTER_SUCCESS:
        return { loading: false, message: action.payload };
      case USER_REGISTER_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const userActivateReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_ACTIVATE_REQUEST:
        return { loading: true };
      case USER_ACTIVATE_SUCCESS:
        return { loading: false, userInfo: action.payload};
      case USER_ACTIVATE_FAIL:
        return { loading: false, error : action.payload }
      default:
        return state;
    }
  };
  
  export const userUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_UPDATE_REQUEST:
        return { loading: true };
      case USER_UPDATE_SUCCESS:
        return { loading: false, userInfo: action.payload, success: true };
      case USER_UPDATE_FAIL:
        return { loading: false, error: action.payload, success: false };
      default:
        return state;
    }
  };
  
 export const forgotPasswordReducer = (state ={}, action) => {
   switch (action.type) {
     case FORGOT_PASSWORD_REQUEST:
       return { loading: true };
     case FORGOT_PASSWORD_SUCCESS:
       return { loading: false , message:action.payload, success: true};
     case FORGOT_PASSWORD_FAIL:
       return { loading: false , error: action.payload, success: false};
     default:
       return state;
   }
 };

 export const resetPasswordReducer = (state ={}, action) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return { loading: true };
    case RESET_PASSWORD_SUCCESS:
      return { loading: false , message:action.payload, success: true};
    case RESET_PASSWORD_FAIL:
      return { loading: false , error: action.payload, success: true};
    default:
      return state;
  }
};