import axios from 'axios';

// All Action constants
export const FETCH_USER_LIST = 'FETCH_USER_LIST';
export const DELETE_USER = 'DELETE_USER';
export const SAVE_OR_UPDATE_USER = 'SAVE_OR_UPDATE_USER';
export const EDIT_USER = "EDIT_USER";

// Root url constant
const ROOT_URL = "http://localhost:8080/user";

// Action to fetch user listing
export const fetchUserList = () => {
    return dispatch => {
        axios.get(`${ROOT_URL}/list`)
            .then(response => {
                dispatch({
                    type: FETCH_USER_LIST,
                    payload: response.data
                });
            });
    }
}

// Action to delete user detail
export const deleteUser = (userId, callback) => {
    return dispatch => {
        axios.get(`${ROOT_URL}/deleteUser/${userId}`)
            .then(response => {
                dispatch({
                    type: DELETE_USER,
                    payload: userId
                });
                callback(response.data);
            });
    }
}

// Action to save or update user details
export const saveOrUpdateUser = (userDetail, callback) => {
    return dispatch => {
        axios.post(`${ROOT_URL}/saveOrUpdate`, userDetail)
            .then(response => {
                dispatch({
                    type: SAVE_OR_UPDATE_USER,
                    payload: response
                });
                dispatch({
                    type: EDIT_USER,
                    payload: {}
                })
                callback(response.data);
            });
    }
}

// Action to edit user details
export const editUser = (userDetail) => {
    return {
        type: EDIT_USER,
        payload: userDetail
    }
}
