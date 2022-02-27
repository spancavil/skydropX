import React, { useContext, useEffect, useState } from 'react';
import { InfoData } from '../../Context/InfoProvider';
import FlowBackground from '../../Global-Components/FlowBackground';
import styles from './styles.module.scss';

import envioExitoso from '../../Assets/img/envioExitoso.png'
import Button from '../../Global-Components/Button';
import InfoIcon from '../../Assets/svg/infoIcon';
import ModalSend from './Components/ModalSend';
import SkydropService from '../../Services/Skydrop.service';
import SwalAlert from '../../Utils/sweetAlert';

const Impresion = () => {
    const { linkPdf, order_id} = useContext(InfoData);

    const [sendLabel, setSendLabel] = useState(false);
    const [sendingState, setSendingState] = useState("");

    useEffect(() => {

        let objFra = document.getElementById('pdfDocument');
        objFra.style.visibility = "hidden";
        objFra.onload = () => {
            objFra.contentWindow.focus();
            objFra.contentWindow.print();
        }

    }, [])

    const handleSend = async (email) => {
        console.log("handle send");
        setSendingState("pending");
        try {
            const response = await SkydropService.resendLabel(order_id, email)
            console.log(response);
            if (response.status === 201) setSendingState("completed")
        } catch (error) {
            console.log(error);
            SwalAlert("Error de comunicación con el servidor: " + error.message);
        }
    }

    const handleCloseModal = () => {
        setSendLabel(false);
        setSendingState("");
    }

    return (
        <>
            {linkPdf && (
                <iframe
                    src={linkPdf}
                    id="pdfDocument"
                    style={{
                        width: "100vw",
                        height: '100vh'
                    }}
                    title="iframe"
                />
            )
            }
            <FlowBackground>
                <div className={styles.container}>
                    <div className={styles.tareaCumplida}>
                        <img
                            src={envioExitoso}
                            alt="envio-exitoso"
                        />
                        <div className={styles.textContainer}>
                            <h2 className={styles.title}>¡Tarea cumplida!</h2>
                            <h2 className={styles.subtitle}>Creamos tu envío con éxito <br />Tu guía y ticket ya están impresos.</h2>
                            <Button
                                text="Enviar guía por correo electrónico"
                                width={'381px'}
                                color="outlined"
                                canContinue={false}
                                onClick={() => setSendLabel(true)}
                            />
                        </div>
                    </div>
                    <div className={styles.acercate}>
                        <h2 className={styles.acercateTitle}>Ahora acércate a la caja y paga el envío</h2>
                        <div className={styles.textInfo}>
                            <InfoIcon />
                            <h3 className={styles.acercateSub}>Recuerda que el envío será válido cuando realices el pago.</h3>
                        </div>
                    </div>
                    <div className={styles.duda}>
                        <h3 className={styles.dudaTitle}>Si tienes alguna duda o consulta, escríbenos a <span>clientes@skydropx.com</span></h3>
                    </div>
                </div>
                {sendLabel && (
                    <ModalSend
                        handleClose={handleCloseModal}
                        handleSend = {handleSend}
                        sendingState = {sendingState}
                    />)
                }
            </FlowBackground>
        </>
    )
}

export default Impresion;