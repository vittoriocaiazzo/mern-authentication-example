import { useContext, useState } from 'react';
import { AuthContext } from '../store/contexts/AuthContext';
import { deleteMeAction } from '../store/actions/userActions';

// importing components
import DeleteAccountForm from '../components/Forms/DeleteAccountForm';
import Loading from '../components/Loading/Loading';

const DeleteAccount = () => {
  const { authState, dispatch } = useContext(AuthContext);

  const [passwordInput, setPasswordInput] = useState({
    password: {
      type: 'password',
      name: 'password',
      placeholder: 'Password',
      value: '',
    },
  });

  const onChange = (e) => {
    const { name, value } = e.target;

    setPasswordInput((prevInputs) => {
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

    deleteMeAction(dispatch, passwordInput.password.value);
  };

  return (
    <div className="delete-account">
      <h2 className="title title--with-sub">DELETE ACCOUNT</h2>
      <h3 className="subtitle">
        Attention! If you delete your account all your data will be lost
        forever!
      </h3>
      <DeleteAccountForm
        input={passwordInput}
        onChange={onChange}
        onSubmit={onSubmit}
      />
      <div className="status error-status">
        {authState.errorMessage && `* ${authState.errorMessage}`}
      </div>
      {authState.isLoading && <Loading />}
    </div>
  );
};

export default DeleteAccount;
