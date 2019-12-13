import React from 'react';

const Talk = (props) => {
  const {talk, user} = props;
  return (
    <div>
      <h1>{talk.title}</h1>
      {/* DateTime.new(2011,10,1,9).to_s(:time) #=> "09:00" */}
      <button>Add to schedule</button>
    </div>
  )
};

export default Talk;