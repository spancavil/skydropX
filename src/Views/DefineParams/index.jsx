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
import Button2 from "../../Global-Components/Button2";

const DefineParams = () => {

    //States for show or hide
    const [weight, setWeight] = useState(false)
    const [service, setService] = useState(false)
    const [shipping, setShipping] = useState(false)

    //Sender form states
    const [formSender, setFormSender] = useState(false);
    const [senderData, setSenderData] = useState({});

    const [formReceiver, setFormReceiver] = useState(true);
    const [receiverData, setReceiverData] = useState({});

    //Category states
    const [category, setCategory] = useState(false);
    const [categoryData, setCategoryData] = useState({})

    //Delivery states
    const [delivery, setDelivery] = useState(false);
    const [deliveryData, setDeliveryData] = useState({})

    const [block, setBlock] = useState(false) //Bloquea momentáneamente las cards para que no se le haga click
    const [shippingsOn, setShippingsOn] = useState(false)

    const { 
        WEIGHTS, SERVICE_TYPES, codigosPostales, stateAndCity, setSizePackage, getServices, senderDataCtx, receiverDataCtx, deliveryTypes,
        setServicePackage, setShippingPackage, setShippingAvailable, getShippingServices, setSenderDataCtx, setReceiverDataCtx, getDeliveryTypes, setDeliveryTypeSelected,
    } = useContext(InfoData);

    const navigate = useNavigate();

    const defineSize = (size) => {
        setSizePackage(size);
        getServices(size);
        setWeight(false);
        setService(true);
    }

    const defineService = async (service) => {
        await setServicePackage(service);
        setService(false)
        
        const shippings = await getShippingServices(Object.keys(service)[0])

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

    const handleFormSender = () => {
        setSenderDataCtx({
            ...senderDataCtx,
            address_from:{
                province: stateAndCity.stateOrigen,
                city: stateAndCity.cityOrigen || "",
                name: senderData.nombreCompleto,
                zip: codigosPostales.origen,
                country: "MX",
                address1: senderData.calle,
                company: "skydropx",
                address2: senderData.colonia,
                phone: senderData.telefono,
                email: senderData.correoElectronico
            }
        })
        setFormSender(false);
        setFormReceiver(true)
    }

    const handleFormReceiver = (dataReceiver) => {
        setReceiverDataCtx({
            ...receiverDataCtx,
            address_to:{
                province: stateAndCity.stateDestino,
                city: stateAndCity.cityDestino || "",
                name: receiverData.nombreCompleto,
                zip: codigosPostales.destino,
                country: "MX",
                address1: receiverData.calle,
                company: "skydropx",
                address2: receiverData.colonia,
                phone: receiverData.telefono,
                email: receiverData.correoElectronico
            }
        })
        setFormReceiver(false);

        getDeliveryTypes();
        setDelivery(true);
    }

    const defineDelivery = (delivery) => {
        setDeliveryTypeSelected(delivery);
        setDelivery(false);
    }

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
        if (!weight && !service && !shipping && !formSender && formReceiver){
            setSenderDataCtx({}); //Hay que cambiar esto, así cuando backean ya tienen los datos disponibles para cambiarlos
            setFormReceiver(false);
            setFormSender(true);
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
                            {SERVICE_TYPES.map((serviceCost, idx) => {
                                return <Card type="service" content={serviceCost} key={idx} onClick={defineService} block={block} setBlock = {setBlock} />
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
                {formSender && <Form 
                    width={'calc(100vw - 170px)'} 
                    // height={"490px"}
                    codigoPostal = {codigosPostales.origen}
                    stateAndCity = {stateAndCity}
                    setData = {setSenderData}
                    formSender = {true}
                />}

                {formReceiver && <Form 
                    width={'calc(100vw - 170px)'} 
                    // height={"414px"}
                    codigoPostal = {codigosPostales.destino}
                    stateAndCity = {stateAndCity}
                    setData={setReceiverData}
                    formReceiver = {true}
                />}

                {delivery &&
                <>
                    <h1 className={styles.title}>¿Quieres entregar tu paquete en esta tienda?</h1>
                    <div className={styles.cardContainer}>
                        {deliveryTypes.map((delivery,idx) => {
                            return <Card type="delivery" content = {delivery} key = {idx} onClick = {defineDelivery} block = {block} setBlock={setBlock} />
                        })}
                    </div>
                </>


                }

                {weight && (
                    <div className={styles.subContainer}>
                        <InfoIcon />
                        <h2 className={styles.subtitle}>*Para calcular los centímetros lineales suma el largo, ancho y alto del paquete.</h2>
                    </div>
                )}

                <div className={styles.buttonContainer}>
                    <Button text="Regresar" width="132px" color="outlined" onClick={()=> handleBack()} />
                    {formSender && <Button2 text="Continuar" width='132px' canContinue={Object.keys(senderData).length !== 0} handleContinue={handleFormSender}/>}
                    {formReceiver && <Button2 text="Continuar" width='132px' canContinue={Object.keys(receiverData).length !== 0} handleContinue={handleFormReceiver}/>}
                </div>
            </div>
        </FlowBackground>
    )
}

export default DefineParams;