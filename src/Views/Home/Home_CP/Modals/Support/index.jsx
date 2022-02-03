import React from 'react';
import QrCode from '../../../../../Assets/svg/qrCode';
import SupportIcon from '../../../../../Assets/svg/supportIcon';
import ModalBackground from '../Background';
import styles from './styles.module.scss';

const Support = ({handleClose, width, height}) => {
    return (
        <ModalBackground handleClose={handleClose} width={width} height={height}>
            <div className={styles.iconContainer}>
                    <SupportIcon/>
            </div>
            <h1 className={styles.title}>Soporte al cliente</h1>
            <h2 className={styles.sub}> Escanéa el siguiente código</h2>
            <h3 className={styles.body}>Solicita soporte al cliente con nuestro equipo o escríbenos a</h3>
            <h3 className ={styles.link}>clientes@skydropx.com</h3>
            <QrCode className={styles.logo}/>
           
        </ModalBackground>
    )
};

export default Support;
