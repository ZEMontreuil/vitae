import React from 'react';
import InputForm from './InputForm';
import Modal from 'react-modal';

let ModalComponent = props => {
  Modal.setAppElement('#root');

  const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

  let inputFormComponent;

  if (!props.editingItem) {
    inputFormComponent = <InputForm 
      handleSubmit = {props.handleSubmit}
    />
  } else {
    inputFormComponent = <InputForm
      handleSubmit = {props.handleSubmit}
      editingItem = {props.editingItem}
    />
  }

  return (
    <Modal 
        isOpen={true}
        style={customStyles}
        contentLabel={props.label}
        onRequestClose={props.requestClose}
      > 

      <div className="modal-inner">
        <h2>
          {props.headerText}
        </h2>
        <span><button onClick={props.handleExit}> 
          X 
        </button></span>

        {inputFormComponent}
      </div>
    </Modal>
  );
}  


export default ModalComponent;
