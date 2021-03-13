import { NavLink } from 'react-router-dom';

const LoginForm = (props) => {
  return (
    <form className="login-form" onSubmit={(e) => props.onSubmit(e)}>
      {Object.keys(props.inputs).map((key) => (
        <input
          className="textbox"
          key={key}
          name={props.inputs[key].name}
          type={props.inputs[key].type}
          placeholder={props.inputs[key].placeholder.toUpperCase()}
          value={props.inputs[key].value}
          onChange={(e) => props.onChange(e)}
        ></input>
      ))}
      <NavLink to="/ForgotPassword" className="forgot-password-link">
        Forgot Password?
      </NavLink>
      <button className="button button--green">LOGIN</button>
    </form>
  );
};

export default LoginForm;
