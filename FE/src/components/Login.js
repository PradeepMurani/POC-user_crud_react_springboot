import React from 'react';
import { Card, CardActions, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { Field, reduxForm } from 'redux-form'
import { FormControl } from './common/FormControl';

class Login extends React.Component {

  submitLogin(data) {
    localStorage.setItem("username", data.email);
    this.props.history.replace('/admin');
  }

  componentWillMount() {
    if(localStorage.getItem("username") !== null) {
      this.props.history.replace('/admin');
    }
  }
  
  render() {
    const { handleSubmit } = this.props;
    
    return (
      <form onSubmit={handleSubmit(this.submitLogin.bind(this))}>
        <Card className="center">
          <CardTitle title="Login" />
          <CardActions>
            <Field name="email" type="text" label="UserName" component={FormControl} />
            <Field name="password" type="password" label="Password" component={FormControl} />
            <RaisedButton type="submit" label="Login" primary={true} />
          </CardActions>
        </Card>
      </form>
    );
  }
}

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = "Please enter a valid email address";
  }
  if (!values.password) {
    errors.password = "Please enter password.";
  }
  return errors
}

export default reduxForm({
  form: 'login_form',
  validate
})(Login);