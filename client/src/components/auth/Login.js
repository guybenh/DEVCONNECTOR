import React from "react";
import {Link} from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChangeHandler = (val) => {
    setFormData({ ...formData, [val.target.name]: val.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    console.log('SUCCESS');
  };

  // React.useEffect(() => console.log('name changed') ,[name]);

  return (
    <div>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign Into Your Account
      </p>
      <form className="form" onSubmit={(e) => onSubmitForm(e)}>
        <input
          type="email"
          value={email}
          placeholder="Email Address"
          name="email"
          onChange={(e) => onChangeHandler(e)}
        />
        <small className="form-text">
          This site uses Gravatar so if you want a profile image, use a Gravatar
          email
        </small>
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
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
