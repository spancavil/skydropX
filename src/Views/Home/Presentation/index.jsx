import React from 'react';
import ElipseHome1 from '../../../Assets/svg/elipseHome1';
import styles from './styles.module.scss';
import logo from '../../../Assets/img/logoSkydrop.png';
import fedEx from '../../../Assets/img/fedEx.png';
import sendEx from '../../../Assets/img/sendEx.png';
import redPack from '../../../Assets/img/redPack.png';
import carsa from '../../../Assets/img/carsa.png';
import Estafeta from '../../../Assets/svg/estafeta';

const Presentation = ({onClick}) => {
    return (
        <>
            <div className={styles.container1} onClick={onClick}>
                <img
                    src={logo}
                    alt="logoSky"
                    className={styles.logo}
                />
                <h1 className={styles.title}>Toca la pantalla para crear tu envío</h1>
                <h1 className={styles.sub}>(Protector de pantalla)</h1>
                <ElipseHome1 className={styles.elipse} />
            </div>
            <footer className={styles.footer}>
                <h1 className={styles.paqueterias}>Paqueterías con las que trabajamos</h1>
                <div className={styles.container2}>
                    
                    <Estafeta
                        style={{ width: "155px", objectFit: "contain" }}
                    />
                    <img
                        src={fedEx}
                        alt="fedEx"
                        style={{ width: "79px", objectFit: "contain" }}
                    />
                    <img
                        src={sendEx}
                        alt="sendEx"
                        style={{ width: "90px", objectFit: "contain" }}
                    />
                    <img
                        src={redPack}
                        alt="redPack"
                        style={{ width: "160px", objectFit: "contain" }}
                    />
                    <img
                        src={carsa}
                        alt="carsa"
                        style={{ width: "40px", objectFit: "contain" }}
                    />
                </div>
            </footer>
        </>
    );
};

export default Presentation;
