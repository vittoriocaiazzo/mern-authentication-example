import { useContext, useState } from 'react';
import { AuthContext } from '../store/contexts/AuthContext';
import { loginAction } from '../store/actions/authActions';

// importing components
import LoginForm from '../components/Forms/LoginForm';
import Loading from '../components/Loading/Loading';

const Login = (props) => {
  const { authState, dispatch } = useContext(AuthContext);

  const [loginInputs, setLoginInputs] = useState({
    email: {
      type: 'email',
      name: 'email',
      placeholder: 'email',
      value: '',
    },
    password: {
      type: 'password',
      name: 'password',
      placeholder: 'password',
      value: '',
    },
  });

  const onChange = (e) => {
    const { name, value } = e.target;

    setLoginInputs((prevInputs) => {
      return {
        ...prevInputs,
        [name]: {
          ...prevInputs[name],
          value,
        },
      };
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const user = {
      email: loginInputs.email.value,
      password: loginInputs.password.value,
    };

    loginAction(dispatch, user);
  };

  return (
    <div className="login">
      <h2 className="login__title">LOGIN ACCOUNT</h2>
      <LoginForm inputs={loginInputs} onChange={onChange} onSubmit={onSubmit} />
      <div
        className={`status ${
          (authState.errorMessage && 'error-status') ||
          (authState.message && 'success-status')
        }`}
      >
        {(authState.errorMessage && `* ${authState.errorMessage}`) ||
          (authState.message && authState.message)}
      </div>
      {authState.isLoading && <Loading />}
    </div>
  );
};

export default Login;
