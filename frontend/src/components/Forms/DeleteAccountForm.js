const DeleteAccountForm = (props) => {
  return (
    <form className="delete-account-form" onSubmit={(e) => props.onSubmit(e)}>
      <input
        className="textbox"
        name={props.input.password.name}
        type={props.input.password.type}
        placeholder={props.input.password.placeholder.toUpperCase()}
        value={props.input.password.value}
        onChange={(e) => props.onChange(e)}
      />
      <button className="button button--red">DELETE ACCOUNT</button>
    </form>
  );
};

export default DeleteAccountForm;
