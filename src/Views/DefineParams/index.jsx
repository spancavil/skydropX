import React, { useContext, useState } from "react";
import Card from "../../Global-Components/Card";
import Feedback from "../../Global-Components/Feedback";
import FlowBackground from "../../Global-Components/FlowBackground";
import styles from './styles.module.scss';
import InfoIcon from '../../Assets/svg/infoIcon';
import { InfoData } from "../../Context/InfoProvider";
import Button from "../../Global-Components/Button";

const DefineParams = () => {

    const [weight, setWeight] = useState(true)
    const [service, setService] = useState(false)
    const [shipping, setShipping] = useState(false)
    const [block, setBlock] = useState(false) //Bloquea momentáneamente las cards para que no se le haga click
    const [form, setForm] = useState(false);

    const { WEIGHTS, SERVICE_TYPES, codigosPostales, setSizePackage, setServicePackage, setShippingPackage } = useContext(InfoData);

    const defineSize = (size) => {
        setSizePackage(size);
        setWeight(false);
        setService(true);
    }

    const defineService = (service) => {
        setServicePackage(service);
        setService(false)
        setShipping(true)
    }

    const defineShipping = (shipping) => {
        setShippingPackage(shipping);
        setShipping(false)
        setForm(true)
    }

    const handleBack = () => {
        console.log("quiere backear");
    }

    return (
        <FlowBackground>
            <div className={styles.container}>
                <Feedback
                    position={{ x: "135px", y: "92px" }}
                    codigosPostales={codigosPostales}
                    weight={weight}
                    service={service}
                    shipping={shipping}
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
                        <div className={styles.cardContainer}>
                            {WEIGHTS.map(weight => {
                                return <Card type="shipping" content={weight} key={weight} onClick={defineShipping} block={block} setBlock = {setBlock} />
                            })}
                        </div>
                    </>

                }
                {form && null}
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