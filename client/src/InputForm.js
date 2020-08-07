import React from 'react';

function InputForm (props) {
  return (
  <form className="modal">
    <div>
    <input placeholder="Name of Project" 
      value={props.modalFormValue.name}
      id="name" 
      onChange={props.handleChange}/>
    </div>

    <div>
      <textarea placeholder="Description of Project" 
        value={props.modalFormValue.description}
        id="description"
        onChange={props.handleChange}
        />
    </div>
  </form>
  );
}

export default InputForm;