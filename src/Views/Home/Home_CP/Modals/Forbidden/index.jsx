import React from 'react';
import ModalBackground from '../Background';
// import styles from './styles.module.scss';

const Forbidden = ({handleClose, width, height}) => {
  return (
      <ModalBackground handleClose={handleClose} width={width} height={height}>
          <h2>Forbidden</h2>
      </ModalBackground>
  );
};

export default Forbidden;
