import React, { PropTypes } from 'react';
import classnames from 'classnames';
import s from './Spinner.scss';
import Spinner from 'share/Spinner';

const ActionSpinner = (props) => {
  return (
    <div className={classnames(s.spinnerOverLap, props.isShowSpinner ? '' : 'hidden')}>
       <Spinner />
    </div>
  );
};

ActionSpinner.propTypes = {
  isShowSpinner: PropTypes.bool
};

export default ActionSpinner;
