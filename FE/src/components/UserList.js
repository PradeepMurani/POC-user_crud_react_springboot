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
import { Link } from 'react-router-dom';
import { fetchUserList, deleteUser, editUser } from '../actions/UserAction';
import { FormControl } from './common/FormControl';

const TableExampleSimple = (props) => {
  const deleteUserDetail = (userId) => {
    props.deleteUser(userId, (response) => alert(response.message));
  }

  const editUserDetail = (userDetail) => {
    props.editUser(userDetail);
    props.history.push('/admin/adduser');
  }

  return (
    <Table selectable={false}>
      <TableHeader displaySelectAll={false}
        adjustForCheckbox={false}>
        <TableRow>
          <TableHeaderColumn>ID</TableHeaderColumn>
          <TableHeaderColumn>First name</TableHeaderColumn>
          <TableHeaderColumn>Last name</TableHeaderColumn>
          <TableHeaderColumn>City</TableHeaderColumn>
          <TableHeaderColumn>State</TableHeaderColumn>
          <TableHeaderColumn>Country</TableHeaderColumn>
          <TableHeaderColumn>Action</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
        {
          props.userListWrap.map((user, index) => {
            return (
              <TableRow key={index}>
                <TableRowColumn>{user.id}</TableRowColumn>
                <TableRowColumn>{user.firstName}</TableRowColumn>
                <TableRowColumn>{user.lastName}</TableRowColumn>
                <TableRowColumn>{user.city}</TableRowColumn>
                <TableRowColumn>{user.state}</TableRowColumn>
                <TableRowColumn>{user.country}</TableRowColumn>
                <TableRowColumn>
                  <IconButton touch={true} onClick={event => editUserDetail(user)}>
                    <FontIcon className="fa fa-edit" color='#e02222' />
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

class UserList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchKey: ''
    };
  }

  componentWillMount() {
    if (localStorage.getItem("username") === null) {
      this.props.history.replace('/');
      return;
    }
    this.props.fetchUserList();
  }



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

  render() {
    return (
      <div>
        <Link to={`/admin/adduser`}><RaisedButton label="Add User" primary={true}/></Link>
        <Field name="searchInput" label="Search Name" component={FormControl} onChange={(element, searchKey) =>
          this.setState({ searchKey: searchKey.toLowerCase() })} />
        <TableExampleSimple userListWrap={this.searchResult()} {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userList: state.userList,
    deleteUserMsg: state.deleteUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchUserList, deleteUser, editUser }, dispatch);
}

UserList = reduxForm({
  form: 'search_form',
})(UserList);

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
