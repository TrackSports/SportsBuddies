import React, { PropTypes } from 'react';

const Image = ({ src, ...rest }) => (
  <img src={`${window.API_BASE}/images/${src}`} {...rest} />
);

Image.propTypes = {
  src: PropTypes.string.isRequired
};

export default Image;
