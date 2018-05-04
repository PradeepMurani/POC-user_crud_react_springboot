import { 
    FETCH_USER_LIST,
    DELETE_USER,
    EDIT_USER 
}  from '../actions/UserAction';

// Fetch and delete user reducer
export const fetchUserListReducer = (state = [], action) => {
    switch(action.type) {
        case FETCH_USER_LIST:
            return action.payload;
        case DELETE_USER:
            return [...state.filter(user => user.id !== action.payload)];
        default: 
            return state;    
    }
}

// Edit user reducer
export const editUser = (state = {}, action) => {
    switch(action.type) {
        case EDIT_USER:
            return action.payload;
        default: 
            return state;    
    }
}