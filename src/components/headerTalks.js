import React from 'react';
import PropTypes from 'prop-types';

const HeaderTalks = (props) => {
  const { title } = props;
  return (
    <div style={{ backgroundColor: '#000080', opacity: 0.8 }}>
      <h1 style={{ color: 'white', textAlign: 'left', padding: 20 }}>{title}</h1>
    </div>
  );
};

HeaderTalks.propTypes = {
  title: PropTypes.string.isRequired,
};

export default HeaderTalks;
