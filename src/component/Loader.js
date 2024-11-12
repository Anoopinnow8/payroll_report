import React from 'react';

const Loader = ({ show = false }) => {
  return (
    <div className="loader-main" >
      <div className="spinner"></div>
    </div>
  );
};

export default Loader;
