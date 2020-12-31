import { combineReducers } from 'redux';
import loginReducer from "./login_reducer";
import imageUrlReducer from './imageUrlReducer';
import underLineReducer from './UnderLineReducer';
import CurrentLatLung from './currentLatLung';

const appReducer = combineReducers({
    loginReducer,
    imageUrlReducer,
    underLineReducer,
    CurrentLatLung,
})

export default appReducer
