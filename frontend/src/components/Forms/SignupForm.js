const SignupForm = (props) => {
  return (
    <form className="signup-form" onSubmit={(e) => props.onSubmit(e)}>
      {Object.keys(props.inputs).map((key) => {
        return props.inputs[key].type === 'checkbox' ? (
          <label className="signup-form__label" key={key}>
            <input
              className="checkbox"
              name={props.inputs[key].name}
              type={props.inputs[key].type}
              value={props.inputs[key].value}
              onChange={(e) => props.onCheckboxChange(e)}
            ></input>

            {props.inputs[key].placeholder.toUpperCase()}
          </label>
        ) : (
          <input
            className="textbox"
            key={key}
            name={props.inputs[key].name}
            type={props.inputs[key].type}
            placeholder={props.inputs[key].placeholder.toUpperCase()}
            value={props.inputs[key].value}
            onChange={(e) => props.onChange(e)}
          ></input>
        );
      })}
      <button className="button button--green">SIGNUP</button>
    </form>
  );
};

export default SignupForm;
