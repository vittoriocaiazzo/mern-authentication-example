const ResetPasswordForm = (props) => {
  return (
    <form className="reset-password-form" onSubmit={(e) => props.onSubmit(e)}>
      {Object.keys(props.inputs).map((key) => (
        <input
          className="textbox"
          type={props.inputs[key].type}
          name={props.inputs[key].name}
          placeholder={props.inputs[key].placeholder.toUpperCase()}
          value={props.inputs[key].value}
          onChange={(e) => props.onChange(e)}
        ></input>
      ))}
      <button className="button button--green">RESET PASSWORD</button>
    </form>
  );
};

export default ResetPasswordForm;
