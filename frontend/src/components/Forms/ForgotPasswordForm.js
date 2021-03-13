const ForgotPasswordForm = (props) => {
  return (
    <form className="forgot-password-form" onSubmit={(e) => props.onSubmit(e)}>
      <input
        className="textbox"
        type="email"
        name="ForgotPassword"
        placeholder="EMAIL"
        value={props.email}
        onChange={(e) => props.onChange(e)}
      ></input>

      <button className="button button--green">SEND EMAIL</button>
    </form>
  );
};

export default ForgotPasswordForm;
