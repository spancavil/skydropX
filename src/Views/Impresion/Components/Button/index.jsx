import React from 'react';
import styles from './styles.module.scss'
/**
 * 
 * @param color filled o outlined 
 * @returns 
 */

const ButtonImpresion = ({ children, width = '100%', color, onClick }) => {
  return (
    <button
      className= {styles.buttonFilled}
      onClick={onClick}
      style={{
        width,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '90px',
        marginRight: '60px',
      }}
    >
      {children}
    </button>
  );
};

export default ButtonImpresion;
