import { useContext, useState } from 'react';
import { AuthContext } from '../store/contexts/AuthContext';
import { signupAction } from '../store/actions/authActions';

// importing components
import SignupForm from '../components/Forms/SignupForm';
import Loading from '../components/Loading/Loading';

const Signup = () => {
  const { authState, dispatch } = useContext(AuthContext);

  const [signupInputs, setSignupInputs] = useState({
    username: {
      type: 'text',
      name: 'username',
      placeholder: 'username',
      value: '',
    },
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
    passwordConfirm: {
      type: 'password',
      name: 'passwordConfirm',
      placeholder: 'confirm password',
      value: '',
    },
    role: {
      type: 'checkbox',
      name: 'role',
      placeholder: 'Admin',
      value: 'standard',
    },
  });

  const onChange = (e) => {
    const { name, value } = e.target;

    setSignupInputs((prevInputs) => {
      return {
        ...prevInputs,
        [name]: {
          ...prevInputs[name],
          value,
        },
      };
    });
  };

  const onCheckboxChange = (e) => {
    const { name, value } = e.target;

    setSignupInputs((prevInputs) => {
      return {
        ...prevInputs,
        [name]: {
          ...prevInputs[name],
          value: value === 'admin' ? 'standard' : 'admin',
        },
      };
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const user = {
      username: signupInputs.username.value,
      email: signupInputs.email.value,
      password: signupInputs.password.value,
      passwordConfirm: signupInputs.passwordConfirm.value,
      role: signupInputs.role.value,
    };

    signupAction(dispatch, user);
  };

  return (
    <div className="signup">
      <h2 className="title">REGISTER</h2>
      <SignupForm
        inputs={signupInputs}
        onChange={onChange}
        onCheckboxChange={onCheckboxChange}
        onSubmit={onSubmit}
      />
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

export default Signup;
