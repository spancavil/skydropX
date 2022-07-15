import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../Global-Components/Button';
import Button2 from '../../Global-Components/Button2';
import FlowBackground from '../../Global-Components/FlowBackground';
import styles from './styles.module.scss';
import ayudaSolid from '../../Assets/img/ayudaSolid.png';
import { InfoData } from '../../Context/InfoProvider';
import SkydropService from '../../Services/Skydrop.service';
import SwalAlert from '../../Utils/sweetAlert';

const ErrorPdf = () => {

    const {servicePackage, deliveryTypeSelected, senderDataCtx, receiverDataCtx,
        sizePackage, classCodeCtx, subcategoryIdCtx, shippingPackage, setLinkPdf, setOrder_id, setCPView} = useContext(InfoData);

    const navigate = useNavigate();

    const handlePrint = async () => {
        const service_tag = Object.keys(servicePackage)[0].includes("standard") ? "STD" : "EXP";
        const method_tag = Object.keys(deliveryTypeSelected)[0];
        if (senderDataCtx.address_from &&
            receiverDataCtx.address_to &&
            sizePackage &&
            classCodeCtx &&
            subcategoryIdCtx &&
            service_tag &&
            shippingPackage &&
            method_tag) {

            try {
                const response = await SkydropService.createShipmentAndLabel(
                    senderDataCtx.address_from,
                    receiverDataCtx.address_to,
                    sizePackage,
                    classCodeCtx,
                    subcategoryIdCtx,
                    service_tag,
                    shippingPackage,
                    method_tag
                )
                console.log(response);
                if (response.result !== undefined) {
                    setLinkPdf(response.result?.label_url);
                    setOrder_id(response.result?.order_id);
                    navigate('/impresion')
                }
            }
            catch (error) {
                SwalAlert("Error de comunicación con el servidor: " + error.response?.data?.message || error.message);
                //navigate('/error-pdf')
                // navigate("/");
            }
        }
    }

    const navigateInicio = () => {
        setCPView(true);
        navigate('/')
    }

    return (
        <FlowBackground>
            <div className={styles.container}>
                <h1 className={styles.title}>No pudimos imprimir tu guía pero nada está perdido</h1>
                <h2 className={styles.subtitle}>Puedes intentarlo nuevamente.</h2>
                <div className={styles.buttonContainer}>
                    <Button
                        text="Volver a inicio"
                        width='190px'
                        color='outlined'
                        onClick={navigateInicio}
                    />
                    <Button2
                        text="Crear guía"
                        width='179px'
                        canContinue={true}
                        handleContinue={() => handlePrint()}
                    />
                </div>
                <img
                    src={ayudaSolid}
                    alt="thinking"
                    className={styles.think}
                />
            </div>
        </FlowBackground>
    )
}

export default ErrorPdf;