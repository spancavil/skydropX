import React, { useContext, useState } from "react";
import Card from "../../Global-Components/Card";
import Feedback from "../../Global-Components/Feedback";
import FlowBackground from "../../Global-Components/FlowBackground";
import styles from './styles.module.scss';
import InfoIcon from '../../Assets/svg/infoIcon';
import { InfoData } from "../../Context/InfoProvider";
import Button from "../../Global-Components/Button";
import { useNavigate } from "react-router-dom";
import Form from "../../Global-Components/Form";

const DefineParams = () => {

    //States for show or hide
    const [weight, setWeight] = useState(true)
    const [service, setService] = useState(false)
    const [shipping, setShipping] = useState(false)
    const [formSender, setFormSender] = useState(false);
    // const [formReceiver, setFormReceiver] = useState(false);

    const [block, setBlock] = useState(false) //Bloquea momentáneamente las cards para que no se le haga click
    const [shippingsOn, setShippingsOn] = useState(false)

    const { 
        WEIGHTS, SERVICE_TYPES, setSizePackage, setServicePackage, setShippingPackage, setShippingAvailable, getShippingServices
    } = useContext(InfoData);

    const navigate = useNavigate();

    const defineSize = (size) => {
        setSizePackage(size);
        setWeight(false);
        setService(true);
    }

    const defineService = async (service) => {
        setServicePackage(service);
        setService(false)
        
        const shippings = await getShippingServices()

        /* const shippingsHardcoded = ["EST", "FED", "CAR", "RED", "SEN"];
        setShippingAvailable(shippingsHardcoded) //Saves in context */

        setShippingsOn(shippings);
        setShippingAvailable(shippings);
        setShipping(true)
    }

    const defineShipping = (shipping) => {
        setShippingPackage(shipping);
        setShipping(false)
        setFormSender(true)
    }

    const handleFormSender = (dataSender) => {
        console.log(dataSender);
    }

    /* const handleFormReceiver = (dataReceiver) => {

    } */

    const handleBack = () => {
        if (weight && !service && !shipping){
            setSizePackage("")
            navigate("/");
        }
        if (!weight && service && !shipping){
            setSizePackage("")
            setService(false)
            setWeight(true)
        }
        if (!weight && !service && shipping){
            setServicePackage("")
            setShipping(false)
            setService(true)
        }
        if (!weight && !service && !shipping && formSender){
            setShippingPackage("");
            setFormSender(false)
            setShipping(true)
        }
    }

    return (
        <FlowBackground>
            <div className={styles.container}>
                <Feedback
                    position={{ x: "70px", y: "92px" }}
                />
                {weight && (
                    <>
                        <h1 className={styles.title}>¿Cuál es el peso de tu envío?</h1>
                        <div className={styles.cardContainer}>
                            {WEIGHTS.map(weight => {
                                return <Card type="weight" content={weight} key={weight} onClick={defineSize} block={block} setBlock = {setBlock}/>
                            })}
                        </div>
                    </>
                )}
                {service &&
                    <>
                        <h1 className={styles.title}>¿Qué precio y tipo de servicio prefieres?</h1>
                        <div className={styles.cardContainer}>
                            {SERVICE_TYPES.map(serviceCost => {
                                return <Card type="service" content={serviceCost} key={serviceCost} onClick={defineService} block={block} setBlock = {setBlock}/>
                            })}
                        </div>
                    </>
                }
                {shipping &&
                    <>
                        <h1 className={styles.title}>¿Qué paquetería elijes para realizar el envío?</h1>
                        <div className={styles.cardContainerShipping}>
                            {shippingsOn.map(shipping => {
                                return <Card type="shipping" content={shipping} key={shipping} onClick={defineShipping} block={block} setBlock = {setBlock} />
                            })}
                        </div>
                    </>

                }
                {formSender && <Form width={'calc(100vw - 140px)'} height={"414px"}
                    handleSubmit={handleFormSender}
                />}

                {/* {formReceiver && <Form width={'calc(100vw - 140px)'} height={"414px"}
                    handleSubmit={handleFormReceiver}
                />} */}

                {weight && (
                    <div className={styles.subContainer}>
                        <InfoIcon />
                        <h2 className={styles.subtitle}>*Para calcular los centímetros lineales suma el largo, ancho y alto del paquete.</h2>
                    </div>
                )}

                <div className={styles.buttonContainer}>
                    <Button text="Regresar" width="132px" color="outlined" onClick={handleBack} />
                </div>
            </div>
        </FlowBackground>
    )
}

export default DefineParams;