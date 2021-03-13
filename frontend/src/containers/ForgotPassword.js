import { useContext, useState } from 'react';
import { AuthContext } from '../store/contexts/AuthContext';
import { forgotPasswordAction } from '../store/actions/authActions';

// importing components
import ForgotPasswordForm from '../components/Forms/ForgotPasswordForm';
import Loading from '../components/Loading/Loading';

const ForgotPassword = () => {
  const { authState, dispatch } = useContext(AuthContext);
  const [email, setEmail] = useState('');

  const onChange = (e) => {
    const { value } = e.target;
    setEmail(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    forgotPasswordAction(dispatch, email);
  };

  return (
    <div className="forgot-password">
      <h2 className="title">RESET PASSWORD</h2>
      <ForgotPasswordForm
        email={email}
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

export default ForgotPassword;
