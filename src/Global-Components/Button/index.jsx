import React from 'react';
import styles from './styles.module.scss'
/**
 * 
 * @param color filled o outlined 
 * @returns 
 */

const Button = ({text, width = '100%', color, onClick}) => {
  return(
    <button 
    className={ color === "filled" ? styles.buttonFilled: styles.buttonOutlined}
    onClick={onClick}
    style={{
        width
    }}
    >
        {text}
    </button>
  );
};

export default Button;
