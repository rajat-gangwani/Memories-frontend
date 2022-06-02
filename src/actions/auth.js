import * as api from "../api";
import {AUTH} from "../actionTypes/index";

export const signin = (formdata,history) => async (dispatch) => {
    try {
        const {data} = await api.signIn(formdata);
        dispatch({type:AUTH,data})
        history('/');
    } catch (error) {
        console.log(error);
    }
};

export const signup = (formData,history) => async (dispatch) => {
    try {
        const {data} = await api.signUp(formData);
        dispatch({type:AUTH,data})
        //signup in the user
        history('/');
    } catch (error) {
        console.log(error);
    }
};