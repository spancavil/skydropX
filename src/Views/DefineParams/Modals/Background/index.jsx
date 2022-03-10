import React from 'react';
import Button from '../../../../Global-Components/Button';
import styles from './styles.module.scss'

const ModalBackground = ({ children, handleClose, width, height }) => {
    return (
        <div className={styles.background}>
            <div className={styles.container}
            style={{
                width,
                height
            }}
            >
                {children}
                
                <div
                style={
                    {
                        position: "absolute",
                        bottom: '30px',
                        right: "50px",
                        zIndex: '10' 
                    }
                }>
                    <Button text="Cerrar" color="filled" onClick={handleClose} width='130px'/>
                </div>

            </div>
        </div>
    )
};

export default ModalBackground;