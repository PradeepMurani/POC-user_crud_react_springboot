import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import { HashRouter, Switch } from 'react-router-dom';
import SideBar from './components/Sidebar';
import Login from './components/Login';
import UserList from './components/UserList';
import AddUser from './components/AddUser';
import { Redirect } from 'react-router-dom';

const AdminRoute = (props) => 
<div>
    <SideBar {...props} />
    <Switch>
            <Route path={props.match.url + '/adduser'} exact component={AddUser} />   
            <Route path={props.match.url + '/home'} exact component={UserList} />
            <Redirect to={props.match.url + '/home'} />
    </Switch>
</div>;

const RootApp = ({ fetchLogin}) => {
    return (
        <HashRouter>
            <Switch>                  
              <Route path='/' exact component={Login} />
              <Route path='/admin' component={AdminRoute} />
            </Switch>
        </HashRouter>
    );
}

export default connect(null, {})(RootApp);