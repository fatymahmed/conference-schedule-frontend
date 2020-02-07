import React from 'react';
import PropTypes from 'prop-types';

const HeaderTalks = (props) => {
  const { title } = props;
  return (
    <div className="headerContainer">
      <h1 className="headerTitle">{title}</h1>
    </div>
  );
};

HeaderTalks.propTypes = {
  title: PropTypes.string.isRequired,
};

export default HeaderTalks;
