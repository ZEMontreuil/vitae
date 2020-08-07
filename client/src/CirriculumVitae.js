import React from 'react';
import CVItem from './CVItem';

function CirriculumVitae(props) {
  return (
    <div className="cv-body">
      <ul className="cv-list">
        {props.items.map((i) => {
          return <CVItem 
            item={i} key={i.id} 
            handleDelete={() => props.handleDelete(i.id)}
            handleDescriptionClick={() => props.handleDescriptionClick(i.id)}/>
        })}
      </ul>
    </div>
  );
}

export default CirriculumVitae;