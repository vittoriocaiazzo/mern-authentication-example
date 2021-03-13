const Modal = (props) => {
  return (
    <div className="backdrop">
      <div className="modal">
        <div className="modal__message">{props.message}</div>
        <button className="button button--modal" onClick={props.closeModal}>
          OK
        </button>
      </div>
    </div>
  );
};

export default Modal;
