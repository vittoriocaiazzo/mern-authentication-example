import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../store/contexts/AuthContext';
import { resetPasswordAction } from '../store/actions/authActions';

// importing components
import ResetPasswordForm from '../components/Forms/ResetPasswordForm';
import Loading from '../components/Loading/Loading';

const ResetPassword = () => {
  const { authState, dispatch } = useContext(AuthContext);
  const resetToken = useParams().resetToken;

  const [inputs, setInputs] = useState({
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
  });

  const onChange = (e) => {
    const { name, value } = e.target;

    setInputs((prevInputs) => {
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

    const newPassword = {
      password: inputs.password.value,
      passwordConfirm: inputs.passwordConfirm.value,
    };

    resetPasswordAction(dispatch, resetToken, newPassword);
  };

  return (
    <div className="reset-password">
      <h2 className="title">RESET PASSWORD</h2>
      <ResetPasswordForm
        inputs={inputs}
        onChange={onChange}
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

export default ResetPassword;
