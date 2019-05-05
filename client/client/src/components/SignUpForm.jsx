import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


const SignUpForm = ({
  onSubmit,
  onChange,
  errors,
  user,
}) => (
  <Card className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">APPLY FOR E-PASSPORT FILL ALL FORM FIELD</h2>

      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div className="field-line">
        <TextField
          floatingLabelText="Surname, Middlename Firstname"
          placeholder=""
          name="name"
          errorText={errors.name}
          onChange={onChange}
          value={user.name}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Sex"
          name="sex"
          errorText={errors.sex}
          onChange={onChange}
          value={user.sex}
        />
      </div>

       <div className="field-line">
        <TextField
          floatingLabelText="Date Of Birth"
          name="age"
          errorText={errors.age}
          onChange={onChange}
          value={user.age}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Nationality"
          name="country"
          errorText={errors.country}
          onChange={onChange}
          value={user.country}
        />
      </div>

       <div className="field-line">
        <TextField
          floatingLabelText="State of Origin"
          name="pob"
          errorText={errors.pob}
          onChange={onChange}
          value={user.pob}
        />
      </div>


       <div className="field-line">
        <TextField
          floatingLabelText="Single, Married, Divorced"
          placeholder =""
          name="status"
          errorText={errors.status}
          onChange={onChange}
          value={user.status}
        />
      </div>


      <div className="field-line">
        <TextField
          floatingLabelText="Email"
          name="email"
          errorText={errors.email}
          onChange={onChange}
          value={user.email}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Password"
          type="password"
          name="password"
          onChange={onChange}
          errorText={errors.password}
          value={user.password}
        />
      </div>

      <div className="button-line">
        <RaisedButton type="submit" label="Create New Account" primary />
      </div>

      <CardText>Already have an account? <Link to={'/login'}>Log in</Link></CardText>
    </form>
  </Card>
);

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default SignUpForm;
