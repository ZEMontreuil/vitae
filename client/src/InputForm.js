import React, {useState} from 'react';

function InputForm (props) {
  let newTitleValue = '';
  let newDescriptionValue = '';
  
  if (props.editingItem) {
    newTitleValue = props.editingItem['title'];
    newDescriptionValue = props.editingItem['description'];
  }

  console.log(newTitleValue);

  const [titleValue, setTitleValue] = useState(newTitleValue);
  const [descriptionValue, setDescriptionValue] = useState(newDescriptionValue);

  let handleSubmit = () => {
    props.handleSubmit(titleValue, descriptionValue);
  }

  return (
    <form className="modal">
      <div>
      <input placeholder='Title'
        value={titleValue}
        id="name" 
        onChange={e => setTitleValue(e.target.value)}/>
      </div>

      <div>
        <textarea placeholder='Description'
          value={descriptionValue}
          id="description"
          onChange={e => setDescriptionValue(e.target.value)}/>
      </div>

      <div className="buttons">
        <button onClick={handleSubmit}>Submit</button>
      </div>

    </form>
  );
}

export default InputForm;