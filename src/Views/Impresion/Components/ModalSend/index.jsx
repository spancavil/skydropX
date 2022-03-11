import React, { useContext, useEffect, useState } from 'react';
import Button from '../../../../Global-Components/Button';
import Button2 from '../../../../Global-Components/Button2';
import ModalBackground from '../Background';
import styles from './styles.module.scss';
import Input from '../../Components/Input';
import { schemaEmail } from '../../../../Utils/validateForm';
import { InfoData } from '../../../../Context/InfoProvider';

import messageSent from '../../../../Assets/img/messageSent.png';
import successSendIcon from '../../../../Assets/img/successSendIcon.png';

/**
 * 
 * @param {sendingState} "possible states: null, 'pending', 'completed', 'failed'" 
 * @returns 
 */

const ModalSend = ({ handleClose, handleSend, sendingState = null }) => {

    const { senderDataCtx } = useContext(InfoData);

    const [email, setEmail] = useState("");
    const [errorEmail, setErrorEmail] = useState("");

    const handleMail = (value) => {
        setEmail(value)
        const validate = schemaEmail.validate({ email: value })
        if (validate.error?.message) {
            setErrorEmail(validate.error.message)
        } else {
            setErrorEmail("")
        }
    }

    console.log(senderDataCtx);

    useEffect(() => {
        if (senderDataCtx?.address_from?.email) {
            setEmail(senderDataCtx?.address_from?.email)
        }
    }, [senderDataCtx, setEmail])

    console.log(sendingState);

    return (
        <ModalBackground>
            <div className={styles.modalContainer}>
                <div className={styles.textContainer}>
                    <img
                        src={messageSent}
                        alt="messagesent"
                        className={styles.mainImage}
                    />
                    {sendingState === "completed" && <div className={styles.successContainer}>
                        <img
                            src={successSendIcon}
                            alt="SuccessSendIcon"
                        />
                        <h3 className={styles.success}>¡Enviamos la guía a tu correo!</h3>
                    </div>}
                    <h2 className={styles.title}>
                        Enviar guía por correo electrónico
                    </h2>
                    <div className={styles.inputContainer}>
                        <Input
                            width={'100%'}
                            inputName="Correo electrónico*"
                            inputValue={email}
                            errorMessage={errorEmail}
                            handleChange={handleMail}
                        />
                    </div>
                    <h3 className={styles.label}>Si no quieres enviarla a este correo, puedes modificarlo.</h3>
                </div>
                <div className={styles.buttonContainer}>
                    <Button
                        text={sendingState === "completed" ? "Cerrar" : "Cancelar"}
                        width="131px"
                        color="outlined"
                        onClick={handleClose}
                    />
                    {sendingState !== "completed" &&
                        <Button2
                            text={sendingState === "pending" ? "Enviando..." : "Enviar"}
                            width="222px"
                            canContinue={(!errorEmail && sendingState === "") ? true : false}
                            handleContinue={() => handleSend(email)}
                        />
                    }
                </div>
            </div>
        </ModalBackground>
    )
}

export default ModalSend