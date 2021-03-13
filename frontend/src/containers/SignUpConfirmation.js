import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../store/contexts/AuthContext';
import { signupConfirmationAction } from '../store/actions/authActions';

// importing components
import Loading from '../components/Loading/Loading';

const SignUpConfirmation = () => {
  const { authState, dispatch } = useContext(AuthContext);
  const confirmationToken = useParams().confirmationToken;

  useEffect(() => {
    if (
      !authState.isLoading &&
      authState.message === '' &&
      authState.errorMessage === ''
    )
      signupConfirmationAction(dispatch, confirmationToken);
  });

  return (
    <div className="signup-confirmation">
      <h2 className="title">SIGNUP CONFIRMATION</h2>
      <div className="signup-status">
        {authState.errorMessage || authState.message}
      </div>
      {authState.isLoading && <Loading />}
    </div>
  );
};

export default SignUpConfirmation;
