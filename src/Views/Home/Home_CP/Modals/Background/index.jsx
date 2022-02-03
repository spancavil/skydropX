import React from 'react';
import Button from '../../../../../Global-Components/Button';
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
            </div>
            <div
            style={
            width === "452px" ?     
            {
                position: "relative",
                bottom: '90px',
                left: "120px", 
            }
            :
            {
                position: "relative",
                bottom: '90px',
                left: "390px", 
            }
            }>
                <Button text="Cerrar" color="filled" onClick={handleClose} width='130px'/>
            </div>
        </div>
    )
};

export default ModalBackground;