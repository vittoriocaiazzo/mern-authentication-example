import { useContext, useState } from 'react';
import { AuthContext } from '../store/contexts/AuthContext';
import { changeNameAction } from '../store/actions/userActions';
import { changePasswordAction } from '../store/actions/authActions';
import { CLEAR } from '../store/actions/actionTypes';

// importing components
import ProfileImage from '../components/ProfileImage/ProfileImage';
import PersonalDataForm from '../components/Forms/PersonalDataForm';
import ChangePasswordForm from '../components/Forms/ChangePasswordForm';
import Loading from '../components/Loading/Loading';
import Modal from '../components/Modal/Modal';

const MyPersonalData = () => {
  const { authState, dispatch } = useContext(AuthContext);
  const [modal, setModal] = useState(false);

  const [nameInputs, setNameInputs] = useState({
    firstName: {
      type: 'text',
      name: 'firstName',
      placeholder: 'First Name',
      value: authState.user.firstName ? authState.user.firstName : '',
    },
    lastName: {
      type: 'text',
      name: 'lastName',
      placeholder: 'Last Name',
      value: authState.user.lastName ? authState.user.lastName : '',
    },
  });

  const [passwordInputs, setPasswordInputs] = useState({
    currentPassword: {
      type: 'password',
      name: 'currentPassword',
      placeholder: 'Current Password',
      value: '',
    },
    newPassword: {
      type: 'password',
      name: 'newPassword',
      placeholder: 'New Password',
      value: '',
    },
    newPasswordConfirm: {
      type: 'password',
      name: 'newPasswordConfirm',
      placeholder: 'Confirm Password',
      value: '',
    },
  });

  const onChangeName = (e) => {
    const { name, value } = e.target;

    setNameInputs((prevInputs) => {
      return {
        ...prevInputs,
        [name]: {
          ...prevInputs[name],
          value,
        },
      };
    });
  };

  const onSubmitName = (e) => {
    e.preventDefault();

    const names = {
      firstName: nameInputs.firstName.value,
      lastName: nameInputs.lastName.value,
    };

    changeNameAction(dispatch, names);

    setModal(true);
  };

  const onChangePassword = (e) => {
    const { name, value } = e.target;

    setPasswordInputs((prevInputs) => {
      return {
        ...prevInputs,
        [name]: {
          ...prevInputs[name],
          value,
        },
      };
    });
  };

  const onSubmitPassword = (e) => {
    e.preventDefault();

    const passwords = {
      currentPassword: passwordInputs.currentPassword.value,
      newPassword: passwordInputs.newPassword.value,
      newPasswordConfirm: passwordInputs.newPasswordConfirm.value,
    };

    changePasswordAction(dispatch, passwords);

    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    dispatch({ type: CLEAR });
  };

  return (
    <div className="my-personal-data">
      <ProfileImage username={authState.user.username} />

      <div className="personal-data-container">
        <div className="title">MY PROFILE</div>
        <PersonalDataForm
          inputs={nameInputs}
          onChangeName={onChangeName}
          onSubmitName={onSubmitName}
        />
      </div>
      <div className="change-password-container">
        <div className="title">CHANGE PASSWORD</div>
        <ChangePasswordForm
          inputs={passwordInputs}
          onChangePassword={onChangePassword}
          onSubmitPassword={onSubmitPassword}
        />
      </div>
      {modal && (
        <Modal
          message={authState.message || authState.errorMessage}
          closeModal={closeModal}
        />
      )}
      {authState.isLoading && <Loading />}
    </div>
  );
};

export default MyPersonalData;
