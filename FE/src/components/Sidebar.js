import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Drawer from 'material-ui/Drawer';

// Functional component for PopOverMenu
const PopOverMenu = ({ logout }) => <IconMenu
  iconButtonElement={
    <IconButton> <MoreVertIcon /> </IconButton>
  }
  targetOrigin={{ horizontal: 'right', vertical: 'top' }}
  anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
>
  <MenuItem primaryText="Sign out" onClick={logout} />
</IconMenu>;

// Menu routes of application
const menu = [
  { route: '/home', title: 'Home' },
  { route: '/adduser', title: 'Add User' },
];

// Class based SideBar Component
class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // callback to change the router
  changeRoute(menu) {
    this.setState({ open: false })
    this.props.history.push(this.props.match.url + menu.route);
    this.setState({ title: menu.title });
  }

  // Logout callback
  onLogout() {
    localStorage.removeItem("username");
    this.props.history.replace('/');
  }

  render() {
    const style = {
      backgroundStyle: {
        background: '#333',
        color: '#FFF'
      },
      drawerStyle: {
        background: 'cadetblue',
      },
      menuItemStyle : {
        color: 'white'
      }
    }

    return (
      <div>
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({ open })}
          containerStyle={style.drawerStyle}
        >
          {menu.map((menu, index) =>
            <MenuItem key={index} style={style.menuItemStyle} onClick={this.changeRoute.bind(this, menu)}>{menu.title}</MenuItem>
          )}
        </Drawer>
        <AppBar
          title={this.state.title || 'Home'}
          onLeftIconButtonClick={e => this.setState({ open: !this.state.open })}
          iconElementLeft={this.state.open ? <IconButton><NavigationClose /></IconButton> : null}
          iconElementRight={<PopOverMenu logout={this.onLogout.bind(this)} />}
          style={style.backgroundStyle}
        />
      </div>
    );
  }
}

export default SideBar;
