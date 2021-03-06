import React, { useState, useContext, useRef, useEffect } from 'react';
import styles from './style.module.scss';
import logo from '../../../Assets/img/logoSkydrop.png';
import Footer from './Footer';
import TitleText from '../../../Global-Components/TitleText';
import OrigenDestino from './OrigenDestino';
import Support from './Modals/Support';
import Privacy from './Modals/Privacy';
import Forbidden from './Modals/Forbidden';
import {InfoData} from '../../../Context/InfoProvider';
import { useNavigate } from 'react-router-dom';

const HomeCP = () => {

    const [support, setSupport] = useState(false)
    const [forbidden, setForbidden] = useState(false)
    const [privacy, setPrivacy] = useState(false)
    const navigate = useNavigate()
    const timer = useRef(null)

    const {codigosPostales, listeners, setListeners, resetValues} = useContext(InfoData);

        //Timer for inactivity
        useEffect(() => {
            if (!listeners) {
                const resetAllValuesAndRedirect = () => {
                    navigate('/');
                    window.location.reload();
                }
                const clear = () => {
                    console.log('reset the timer');
                    clearTimeout(timer.current);
                    timer.current = setTimeout(resetAllValuesAndRedirect, 600000);
                }
                timer.current = setTimeout(resetAllValuesAndRedirect, 600000)
                window.addEventListener('keydown', clear)
                window.addEventListener('click', clear)
                console.log("Listeners added");
                setListeners(true)
            }

        }, [listeners, navigate, resetValues, setListeners])

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
                    style={{ paddingTop: "60px" }}
                />
                <h2 className={styles.text2}>
                    Desde aquí puedes crear envíos de forma sencilla, rápida y segura.
                </h2>
                <p className={styles.text3}>
                    Ingresa el <span className={styles.subtext3}>código postal</span> de origen y destino de tu envío.
                </p>
                <OrigenDestino codigosPostales={codigosPostales}/>
                <Footer
                    onSupport={() => setSupport(true)}
                    onForbidden={() => setForbidden(true)}
                    onPrivacy={() => setPrivacy(true)}
                />
                {support && <Support
                    width="452px" height="660px"
                    handleClose={() => setSupport(false)} />}

                {privacy && <Privacy
                    width="1000px" height="660px"
                    handleClose={() => setPrivacy(false)} />}

                {forbidden && <Forbidden
                    width="1000px" height="660px"
                    handleClose={() => setForbidden(false)} />}
            </div>
        </div>
    )
};

export default HomeCP;
