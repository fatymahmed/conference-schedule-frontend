import React from 'react';

const Talk = (props) => {
  const {talk} = props;
  console.log(talk);
  return (
    <div>
      <h1>{talk.title}</h1>
    </div>
  )
};

export default Talk;