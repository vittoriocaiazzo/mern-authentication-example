const PersonalDataForm = (props) => {
  return (
    <form
      className="personal-data-form"
      onSubmit={(e) => props.onSubmitName(e)}
    >
      {Object.keys(props.inputs).map((key) => (
        <input
          key={key}
          className="textbox"
          name={props.inputs[key].name}
          type={props.inputs[key].type}
          placeholder={props.inputs[key].placeholder.toUpperCase()}
          value={props.inputs[key].value}
          onChange={(e) => props.onChangeName(e)}
        />
      ))}

      <button className="button button--green">SAVE</button>
    </form>
  );
};

export default PersonalDataForm;
