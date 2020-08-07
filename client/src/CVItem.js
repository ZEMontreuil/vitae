import React from 'react';

function CVItem (props) {
  let {title, description, descriptionOpened} = props.item;

  // toggle cvitem desc
  let descriptionContentRendering;

  if (descriptionOpened) {
    descriptionContentRendering = (
      <div className="open-content">
        {description}
        <div>
          <button onClick={props.handleDescriptionClick}>
            Less
          </button>
        </div>
      </div>
    )
    
  } else {
      descriptionContentRendering = (
      <button  onClick={props.handleDescriptionClick}>
        More
      </button>
    );
  }

  return(
    <div className="cv-list">
      <li className="cv-item">
        <span className="text-section">
          <div className="title">
            {title}
          </div>
            <div className="description-container">
              {descriptionContentRendering}
            </div>
        </span>
        <button onClick={props.handleDelete}>X</button>
      </li>
    </div>
  );
}

export default CVItem;