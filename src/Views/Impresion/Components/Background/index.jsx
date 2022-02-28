import React from 'react';
import styles from './styles.module.scss'

const ModalBackground = ({ children}) => {
    return (
        <div className={styles.background}>
            {children}
        </div>
    )
};

export default ModalBackground;