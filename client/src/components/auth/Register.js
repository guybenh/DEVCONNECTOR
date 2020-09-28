import React from 'react';
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import {setAlert} from '../../actions/alert';
import PropTypes from 'prop-types';


const Register = (props) => {
    const [formData, setFormData] =React.useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const {name, email, password, password2} = formData;

    const onChangeHandler = val => {
        setFormData({ ...formData, [val.target.name]: val.target.value });
    }

    const onSubmitForm = async e => {
        e.preventDefault();
        if(password !== password2 || !email) {
            props.setAlert('passwords are not equal or email is not set..', 'danger');
        }
        else {console.log({formData});}
    }

    // React.useEffect(() => console.log('name changed') ,[name]);


    return (
      <div>
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Create Your Account
        </p>
        <form className="form" onSubmit={e => onSubmitForm(e)}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              required
              onChange={(e) => onChangeHandler(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              value={email}
              placeholder="Email Address"
              name="email"
              onChange={(e) => onChangeHandler(e)}
            />
            <small className="form-text">
              This site uses Gravatar so if you want a profile image, use a
              Gravatar email
            </small>
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              value={password}
              onChange={(e) => onChangeHandler(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              minLength="6"
              value={password2}
              onChange={(e) => onChangeHandler(e)}
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    );
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
}

export default connect(null, { setAlert })(Register);
