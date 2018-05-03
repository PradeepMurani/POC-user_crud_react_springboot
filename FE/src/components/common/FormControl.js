import React from 'react';
import TextField from 'material-ui/TextField';


export const FormControl = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
  }) => (
    <TextField
      hintText={`Enter your ${label}`}
      floatingLabelText={label}
      {...input}
      fullWidth={true}
      type={type}
      errorText={touched && error ? error : null}
    />
  )
