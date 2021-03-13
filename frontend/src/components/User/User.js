import Delete from '../../assets/delete.png';

const User = (props) => {
  return (
    <div className="user">
      <img
        src={Delete}
        alt=""
        className="delete-icon"
        onClick={() => props.onClick(props.user.email)}
      />
      <div className="user__section">
        <div className="user__label">Name:</div>
        <div className="user__data">{props.user.firstName}</div>
      </div>
      <div className="user__section">
        <div className="user__label">Last Name:</div>
        <div className="user__data">{props.user.lastName}</div>
      </div>
      <div className="user__section">
        <div className="user__label">Username:</div>
        <div className="user__data">{props.user.username}</div>
      </div>
      <div className="user__section">
        <div className="user__label">Email:</div>
        <div className="user__data user__data--email">{props.user.email}</div>
      </div>
    </div>
  );
};

export default User;
