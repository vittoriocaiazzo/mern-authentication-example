import BlankImage from '../../assets/blank-profile.png';

const ProfileImage = (props) => {
  return (
    <div className="profile-container">
      <img className="profile-picture" src={BlankImage} alt="profile" />
      <div>{props.username}</div>
    </div>
  );
};

export default ProfileImage;
