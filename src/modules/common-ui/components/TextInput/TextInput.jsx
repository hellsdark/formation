import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

export const TextInput = ({ value, onChange, onEnter, placeHolder, label, type }) => {
  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      onEnter(e);
    }
  };

  return (
    <span className={styles.input}>
      <label>{label}</label>
      <input type={type} placeholder={placeHolder} value={value} onChange={onChange} onKeyDown={handleKeyDown} />
    </span>
  );
};

TextInput.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onEnter: PropTypes.func,
  placeHolder: PropTypes.string,
  label: PropTypes.string,
};

TextInput.defaultProps = {
  onChange: undefined,
  onEnter: undefined,
  placeHolder: '',
  label: '',
  type: 'text',
  value: '',
};
