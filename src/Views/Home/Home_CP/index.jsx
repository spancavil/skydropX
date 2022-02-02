import React from 'react';
import styles from './style.module.scss';
import logo from '../../../Assets/img/logoSkydrop.png';
import Footer from './Footer';
import TitleText from '../../../Global-Components/TitleText';
import OrigenDestino from './OrigenDestino';

const HomeCP = () => {
    
    return (
        <div className={styles.background}>
            <div className={styles.elipseCp}></div>
            <img
                src={logo}
                alt="skyDrop"
                className={styles.logo}
            />
            <div className={styles.container}>
                <TitleText
                    text="¡Hola, te damos la bienvenida!"
                    style={{ paddingTop: "32px" }} 
                />
                <h2 className={styles.text2}>
                    Desde aquí puedes crear envíos de forma sencilla, rápida y segura.
                </h2>
                <h3 className={styles.text3}>
                    Ingresa el código postal de origen y destino de tu envío. 
                </h3>
                <OrigenDestino/>
                <Footer />
            </div>
        </div>
    )
};

export default HomeCP;
