import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import { forgotPasswordReducer, resetPasswordReducer, userActivateReducer, userLoginReducer, userRegisterReducer, userUpdateReducer } from './reducers/user';
import { noteCreateReducer, noteDeleteReducer, noteListReducer, noteUpdateReducer } from './reducers/notes';

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegistration: userRegisterReducer,
    noteList: noteListReducer,
    noteCreate: noteCreateReducer,
    noteUpdate: noteUpdateReducer,
    noteDelete: noteDeleteReducer,
    userUpdate: userUpdateReducer,
    userActivate: userActivateReducer,
    forgotPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer
});

const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

const initialState = {
    userLogin: {userInfo: userInfoFromStorage},
}

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;