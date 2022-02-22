import React, { useState } from "react";
import './styles.module.scss';
import styles from './styles.module.scss';
import boxSizingSmall from '../../Assets/img/smallBox.png';
import boxSizingMedium from '../../Assets/img/mediumBox.png';
import boxSizingLarge from '../../Assets/img/boxSizingLarge.png';
import fastTruck from '../../Assets/img/fastTruck.png';
import slowTruck from '../../Assets/img/slowTruck.png';

//SHIPPING IMAGES
import estafeta from '../../Assets/img/shippings/estafeta.png';
import carsa from '../../Assets/img/carsa.png';
import fedEx from '../../Assets/img/shippings/fedEx.png';
import redPack from '../../Assets/img/shippings/redPack.png';
import sendEx from '../../Assets/img/shippings/sendEx.png';
// import transportesVencedor from '../../Assets/img/shippings/transportesVencedor.png';
// import ups from '../../Assets/img/shippings/ups.png';
// import grupoAmPm from '../../Assets/img/shippings/grupoAmPm.png';
// import paqueteExpress from '../../Assets/img/shippings/paqueteExpress.png';
// import quiken from '../../Assets/img/shippings/quiken.png';
// import dhl from '../../Assets/img/shippings/dhl.png';
// import dostavista from '../../Assets/img/shippings/dostavista.png';

//DELIVERY TYPE ICONS
import oxxoDelivery from '../../Assets/img/oxxoDeliveryIcon.png';
import delivery from '../../Assets/img/deliveryIcon.png';

//ICONS CONFIRM DATA
import email from '../../Assets/img/mail.png';
import phone from '../../Assets/img/phone.png';

const Card = ({type = "weight", content, onClick, block, setBlock}) => {

    const [border, setBorder] = useState(false);
    let express;
    if (content){
        express = Object.keys(content)[0].includes("express");
    }

    const handleClick = (data) => {
        if (!block){
            setBorder(true)
            setBlock(true)
            setTimeout(()=> {
                setBlock(false)
                onClick(data)
            }, 350)
        }
    }

    const exp = ["Servicio express", "Entrega estimada: 2-3 días hábiles."]
    const std = ["Servicio estándar", "Entrega estimada: 4-7 días hábiles."]

    switch (type) {
        case "weight":
            let size = content === "0 - 1" ? "S": content === "2 - 5" ? "M" : "L";
            return(
                <div 
                className={styles.cardWeight}
                onClick={()=> handleClick(size)}
                style={border ? {border: "3px solid #5233EA"}: null}
                >
                    { size === "S" && 
                    <img
                    style={{
                        position: "relative",
                        width: "60%",
                        marginTop: '20px'
                    }}
                    src={boxSizingSmall}
                    alt="boxSmall"
                    />
                    }
                    { size === "M" &&
                    <img
                    style={{
                        position: "relative",
                        width: "60%",
                        marginTop: '20px'
                    }}
                    alt="boxMedium"
                    src={boxSizingMedium}
                    />
                    }

                    { size === "L" &&
                    <img
                    style={{
                        position: "relative",
                        width: "60%",
                        marginTop: '20px'
                    }}
                    alt="boxLarge"
                    src={boxSizingLarge}
                    />
                    }
                    <h1 className={styles.cardTitle}>{content} kg</h1>
                    <h3 className={styles.cardSubtitle}>Medida máxima:<br/>154 cm lineales*</h3>
                    
                </div>
            );

        case "service":
            return(
                <div className={styles.cardService}
                onClick={()=> handleClick(content)}
                style={border ? {border: "3px solid #5233EA"}: null}
                >
                    <img
                        src={express ? fastTruck : slowTruck}
                        alt="fast-van"
                    />
                    
                    <h2 className={styles.titleService}>${Object.values(content)[0]} MXN</h2>

                    <h3 className={styles.subService1}> {express ? exp[0] : std[0]}</h3>
                    <h3 className={styles.subService2}> {express ? exp[1] : std[1]}</h3>

                </div>
            );

        case "shipping":
            return(
                <div 
                className={styles.cardShipping} 
                onClick={() => handleClick(content)}
                style={border ? {border: "3px solid #5233EA"}: null}
                >
                    <img 
                        src = {
                            content === "EST" ? estafeta :
                            content === "CAR" ? carsa :
                            content === "RED" ? redPack :
                            content === "SEN" ? sendEx :
                            fedEx
                        }
                        alt = "shippingImg"
                        style={
                            content === "CAR" ?
                            {transform: "scale(0.5)"}
                            :
                            null
                        }
                    />
                </div>
            );
        //Card para el tipo de entrega (o sea si se envía desde la tienda o desde alguna sucursal de skydropx)
        case "delivery":
            return(
                <div
                className={styles.deliveryMode}
                onClick={() => handleClick(content)}
                style={border ? {border: "3px solid #5233EA"}: null}
                >
                    <img
                    src={Object.keys(content)[0].includes("oxxo") ? oxxoDelivery: delivery}
                    alt="delivery-type"
                    />
                <h2 className={styles.title}>{Object.keys(content)[0].includes("oxxo") ? "Sí, entregar en esta tienda": "No, entregar en otro lugar" }</h2>
                <h3 className={styles.sub}>{Object.keys(content)[0].includes("oxxo") ? "El costo de comisión es de $7 MXN por paquete.": "Sin costo de comisión"}</h3>
                <h3 className={styles.text}>{Object.keys(content)[0].includes("oxxo") ? "Entrega tu envío en la caja para que la paquetería que elegiste pueda pasar a buscarlo." : "Acude a una sucursal Skydropx o de la paquetería que elegiste. No podrás dejar tu paquete en esta tienda."}</h3>
                </div>
            )
        case "resumeSenderReceiver":
            return(
                <div
                className={styles.senderReceiver}
                >
                    <h2 className={styles.titulo}>Datos del remitente</h2>

                    <div className={styles.senderContainer}>
                        <div className={styles.content}>
                            <h3 className={styles.title}>Juan Román Riquelme</h3>
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                gap: "8px"
                            }}>
                                <img src={email} alt="email" style={{height: "19px", minWidth: '19px'}}/>
                                <h3 className={styles.text}>jesucristooooooooooooooooooooooooooooooooo@gmail.com</h3>
                            </div>
                            <div 
                                style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                gap: "8px"}}
                            >
                                <img src={phone} alt="phone" style={{height: "19px"}}/>
                                <h3 className={styles.text}>+52 telefono</h3>
                            </div>
                        </div>
                        <div className={styles.content}>
                            <h3 className={styles.title}>Dirección</h3>
                            <h3 className={styles.text}>Calle falsa 123</h3>
                            <h3 className={styles.text}>Colonia, CP: 19292</h3>
                            <h3 className={styles.text}>Ciudad, estado</h3>
                        </div>
                    </div>

                    <h2 className={styles.titulo} style={{paddingTop: '12px'}}>Datos del destinatario</h2>

                    <div className={styles.senderContainer}>
                        <div className={styles.content}>
                            <h3 className={styles.title}>Diego Armando Maradona</h3>
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                gap: "8px"
                            }}>
                                <img src={email} alt="email" style={{height: "19px", minWidth: '19px'}}/>
                                <h3 className={styles.text}>maradooooo@hotmail.com</h3>
                            </div>
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                gap: "8px"
                            }}>
                                <img src={phone} alt="phone" style={{height: "19px"}}/>
                                <h3 className={styles.text}>+52 telefono</h3>
                            </div>
                        </div>
                        <div className={styles.content}>
                            <h3 className={styles.title}>Dirección</h3>
                            <h3 className={styles.text}>Calle 123</h3>
                            <h3 className={styles.text}>Colonia CP, Teniente juan domingo peron 29912 1°C</h3>
                            <h3 className={styles.text}>Ciudad, estado</h3>
                        </div>
                    </div>

                    <div className={styles.packageContent}>
                        <h3 className={styles.title}>Contenido del paquete</h3>
                        <h3 className={styles.text}>Teléfono móvil</h3>
                    </div>
                </div>
            )
        case "resumeShipping":
            return(
            <div className={styles.shippingContainer}>
                <img
                    src={fedEx}
                    alt="shipping"
                    style={{height: '55px', padding: '24px 0 0 24px'}}
                />
                <h2 className={styles.titleShipping}>Servicio express</h2>
                <h3 className={styles.textShipping}>Paquete 2 - 5 kg (Max)</h3>

                <div className={styles.costContainer}>
                    <h3 className={styles.left}>Precio de envío</h3>
                    <h3 className={styles.right}>$359 MXN</h3>
                </div>
                <div className={styles.costContainer}>
                    <h3 className={styles.left}>Comisión OXXO <br/>por envío</h3>
                    <h3 className={styles.right}>$13 MXN</h3>
                </div>
                <div className={styles.costContainer}>
                    <h3 className={styles.left}>Comisión OXXO <br/>por entrega de paquete</h3>
                    <h3 className={styles.right}>$7 MXN</h3>
                </div>

                <div className={styles.line}></div>

                <div className={styles.costContainer}>
                    <h3 className={styles.leftPower}>TOTAL <span className={styles.leftMinusPower}><br/>(incluye IVA)</span></h3>
                    <h3 className={styles.rightPower}>$379 MXN</h3>
                </div>
            </div>)

        default:
            return(
                <div className={styles.cardShipping}>
                </div>
            );
    }
}

export default Card;