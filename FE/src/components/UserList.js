import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { fetchUserList, deleteUser, editUser } from '../actions/UserAction';
import { FormControl } from './common/FormControl';
import { EDIT_USER } from '../actions/UserAction';

// Functional component for table
const TableExampleSimple = (props) => {

  // Delete user detail callback
  const deleteUserDetail = (userId) => {
    props.deleteUser(userId, (response) => alert(response.message));
  }

  // Edit user detail callback
  const editUserDetail = (userDetail) => {
    props.editUser(userDetail);
    props.history.replace('/admin/adduser');
  }

  const style = {
    tableStyle: {
      background: '#666'
    },
    tableHeaderTextColor: {
      color: 'white'
    }, 
    tableContentColor : {
      color: 'white'
    }
  }

  return (
    <Table selectable={false} style={style.tableStyle}>
      <TableHeader displaySelectAll={false}
        adjustForCheckbox={false}>
        <TableRow>
          <TableHeaderColumn style={style.tableHeaderTextColor}>#</TableHeaderColumn>
          <TableHeaderColumn style={style.tableHeaderTextColor}>First name</TableHeaderColumn>
          <TableHeaderColumn style={style.tableHeaderTextColor}>Last name</TableHeaderColumn>
          <TableHeaderColumn style={style.tableHeaderTextColor}>City</TableHeaderColumn>
          <TableHeaderColumn style={style.tableHeaderTextColor}>State</TableHeaderColumn>
          <TableHeaderColumn style={style.tableHeaderTextColor}>Country</TableHeaderColumn>
          <TableHeaderColumn style={style.tableHeaderTextColor}>Action</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
        {
          props.userListWrap.map((user, index) => {
            return (
              <TableRow key={index}>
                <TableRowColumn style={style.tableContentColor}>{index + 1}</TableRowColumn>
                <TableRowColumn style={style.tableContentColor}>{user.firstName}</TableRowColumn>
                <TableRowColumn style={style.tableContentColor}>{user.lastName}</TableRowColumn>
                <TableRowColumn style={style.tableContentColor}>{user.city}</TableRowColumn>
                <TableRowColumn style={style.tableContentColor}>{user.state}</TableRowColumn>
                <TableRowColumn style={style.tableContentColor}>{user.country}</TableRowColumn>
                <TableRowColumn>
                  <IconButton touch={true} onClick={event => editUserDetail(user)}>
                    <FontIcon className="fa fa-edit" color='#00BCD4' />
                  </IconButton>
                  <IconButton touch={true} onClick={event => deleteUserDetail(user.id)}>
                    <FontIcon className="fa fa-remove" color='#e02222' />
                  </IconButton>
                </TableRowColumn>
              </TableRow>
            )
          })
        }
      </TableBody>
    </Table>
  )
};

// User list component for listing user details
class UserList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchKey: ''
    };
  }

  // React life method
  componentWillMount() {
    if (localStorage.getItem("username") === null) {
      this.props.history.replace('/');
      return;
    }
    this.props.fetchUserList();
  }

  // Search input hadler method
  searchResult() {
    const { searchKey } = this.state;
    const { userList } = this.props;
    if (searchKey.length <= 0) {
      return userList;
    }

    return userList.filter(row =>
      (row.firstName || '').toLowerCase().startsWith(searchKey) || (row.lastName || '').toLowerCase().startsWith(searchKey)
    );
  }

  routerToAddUser() {
    const { dispatch, history} = this.props;
    dispatch({type: EDIT_USER, payload: {}});
    history.push('/admin/adduser');
  }

  render() {
    return (
      <div>
        <RaisedButton label="Add User" style={{marginTop: '10px'}} primary={true} onClick={this.routerToAddUser.bind(this)}/>
        <Field name="searchInput" label="Search Name" component={FormControl} onChange={(element, searchKey) =>
          this.setState({ searchKey: searchKey.toLowerCase() })} />
        <TableExampleSimple userListWrap={this.searchResult()} {...this.props} />
      </div>
    );
  }
}

// callback to provide redux state as props in component
const mapStateToProps = (state) => {
  return {
    userList: state.userList,
    deleteUserMsg: state.deleteUser
  }
}

// callback for redux action
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchUserList, deleteUser, editUser }, dispatch);
}

UserList = reduxForm({
  form: 'search_form',
})(UserList);

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
