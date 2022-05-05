import React, {useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom';

import Button from '../../Global-Components/Button'
import FlowBackground from '../../Global-Components/FlowBackground'
import InfoIcon from '../../Assets/svg/infoIcon';

import { InfoData } from '../../Context/InfoProvider';
import ModalSend from './Components/ModalSend';

import SkydropService from '../../Services/Skydrop.service';
import SwalAlert from '../../Utils/sweetAlert';
import envioExitoso from '../../Assets/img/envioExitoso.png'

import styles from './styles.module.scss';
import Button2 from '../../Global-Components/Button2';

const EnvioExitoso = () => {

  const { order_id, resetValues, deliveryTypeSelected } = useContext(InfoData);

    const [sendLabel, setSendLabel] = useState(false);
    const [sendingState, setSendingState] = useState("");

    let oxxo;
    if (Object.keys(deliveryTypeSelected).length !== 0) {
        oxxo = Object.keys(deliveryTypeSelected)[0] === "OXX" ? true : false
    }

    const navigate = useNavigate();

    const handleTerminate = (value) => {
        resetValues();
        if (value === "nuevo"){
            navigate('/codigos-postales');
        } else {
            navigate('/');
        }
    }

    const handleSend = async (email) => {
        console.log("handleSend");
        setSendingState("pending");
        try {
            const response = await SkydropService.resendLabel(order_id, email)
            console.log(response);
            if (response.result === true) setSendingState("completed")
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
    <FlowBackground>
      <div className={styles.container}>
        <div className={styles.tareaCumplida}>
          <img
            src={envioExitoso}
            alt="envio-exitoso"
          />
          <div className={styles.textContainer}>
            <h2 className={styles.title}>Creamos tu envío con éxito</h2>
            <h2 className={styles.subtitle}>Tu guía y ticket ya están impresos.</h2>
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
          <h2 className={styles.acercateTitle}>{oxxo ? "Ahora acércate a la caja y paga el envío" : "Ahora, paga el envío en la caja y entrega el paquete en una sucursal"}</h2>
          <div className={styles.textInfo}>
            <InfoIcon />
            <h3 className={styles.acercateSub2}>Recuerda que el envío será válido cuando realices el pago.</h3>
          </div>
          <h3 className={styles.acercateSub}>¿No se imprimió la guía? Da <span onClick={() => navigate("/impresion")}>clic aquí para reimprimir</span></h3>
        </div>
        <div className={styles.duda}>
          <h3 className={styles.dudaTitle}>Si tienes alguna duda o consulta, escríbenos a <span>clientes@skydropx.com</span></h3>
        </div>
        <div className={styles.buttonsContainer}>
          <Button
            text="Finalizar"
            width='130px'
            color="outlined"
            onClick={() => handleTerminate("finalizar")}
          />
          <Button2
            text="Crear nuevo envío"
            width='230px'
            canContinue={true}
            handleContinue={() => handleTerminate("nuevo")}
          />
        </div>
      </div>
      {sendLabel && (
        <ModalSend
          handleClose={handleCloseModal}
          handleSend={handleSend}
          sendingState={sendingState}
        />)
      }
    </FlowBackground>
  )
}

export default EnvioExitoso
