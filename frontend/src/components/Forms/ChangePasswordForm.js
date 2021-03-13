const ChangePasswordForm = (props) => {
  return (
    <form
      className="change-password-form"
      onSubmit={(e) => props.onSubmitPassword(e)}
    >
      {Object.keys(props.inputs).map((key) => (
        <input
          key={key}
          className="textbox"
          name={props.inputs[key].name}
          type={props.inputs[key].type}
          placeholder={props.inputs[key].placeholder.toUpperCase()}
          value={props.inputs[key].value}
          onChange={(e) => props.onChangePassword(e)}
        />
      ))}
      <button className="button button--green">SAVE</button>
    </form>
  );
};

export default ChangePasswordForm;
