import React from 'react';
/**
 * 
 * @param color filled o outlined 
 * @returns 
 */

const ButtonImpresion = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        width: '150px',
        height: '60px',
        textAlign: 'center',
        padding: '0 22px',
        backgroundColor: "#5233EA",
        cursor: 'pointer',
        fontSize: '21px',
        color: 'white',
        border: 'none',
        boxShadow: '0px 3px 1px - 2px rgba(152, 167, 204, 0.2), 0px 2px 2px rgba(152, 167, 204, 0.14), 0px 1px 5px rgba(152, 167, 204, 0.12)',
        borderRadius: '6px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        bottom: '40px',
        right: '50px'
      }}
    >
      {children}
    </button >
  );
};

export default ButtonImpresion;
