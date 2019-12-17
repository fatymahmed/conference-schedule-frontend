import React from 'react';

const HeaderTalks = (props) => {
  const { title } = props;
  return(
    <div style={{backgroundColor: '#000080'}}>
      <h3 style={{color: 'white', textAlign: 'left', left: 20}}>{title}</h3>
    </div>
  )
}
export default HeaderTalks;