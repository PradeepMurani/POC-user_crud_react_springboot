import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { fetchUserListReducer, editUser } from './UserReducer';

const rootReducer = combineReducers({
    form: formReducer,
    userList: fetchUserListReducer,
    editUser
  });

export default rootReducer;