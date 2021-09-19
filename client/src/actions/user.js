import {
    USER_ACTIVATE_REQUEST,
    USER_ACTIVATE_SUCCESS,
    USER_ACTIVATE_FAIL,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    FORGOT_PASSWORD_REQUEST,
    RESET_PASSWORD_REQUEST,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    FORGOT_PASSWORD_SUCCESS,
  } from "../constants/user";
  import axios from "axios";
import { Redirect } from "react-router";

  
  export const login = (email, password) => async (dispatch) => {
    try {
      dispatch({ type: USER_LOGIN_REQUEST });
  
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
  
      const { data } = await axios.post(
        "/api/users/login",
        { email, password },
        config
      );
  
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  export const logout = () => async (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
  };
  
  export const register = (name, email, password, pic) => async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });
  
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
  
      const { data } = await axios.post(
        "/api/users",
        { name, pic, email, password },
        config
      );
      dispatch({ type: USER_REGISTER_SUCCESS, payload:data.message })
      // dispatch({ type: USER_ACTIVATE_REQUEST });
      
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const activateUser = (token) => async (dispatch) => {
    try{
      dispatch({ type: USER_ACTIVATE_REQUEST });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.get(`/api/users/activate/${token}`, config);

      dispatch({ type: USER_ACTIVATE_SUCCESS, payload:data });
      // dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));

    } catch(error) {
      dispatch({
        type: USER_ACTIVATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  }
  
  export const updateProfile = (user) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_UPDATE_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState(); 
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.post("/api/users/profile", user, config);
  
      dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
  
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };


export const forgotPass = (email) => async(dispatch) => {
  try{
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const config = {
      headers: {
        "content-Type": "application/json",
      },
    }

    const {data} = await axios.post("/api/users/forgot-password", {email}, config)
                    
    console.log(data);
    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message })
    // dispatch({ type: RESET_PASSWORD_REQUEST });
  } catch(error){
      dispatch({ type: FORGOT_PASSWORD_FAIL,
                 payload: error.response && error.response.data.message
                 ? error.response.data.message
                 : error.message,
      });
  }
}

export const resetPass = (token, newPassword, confirmPassword) => async(dispatch) => {
  dispatch({ type: RESET_PASSWORD_REQUEST });
  try{
    const config = {
      headers: {
        "content-Type": "application/json",
      },
    }

    const {data} = await axios.put(`/api/users/reset-password/${token}`,{newPassword, confirmPassword}, config);
    console.log(data);
    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.message});
    <Redirect to="/authenticate" />
  } catch(error){
    dispatch({ type: RESET_PASSWORD_FAIL,
              payload: error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
    });
  }
}