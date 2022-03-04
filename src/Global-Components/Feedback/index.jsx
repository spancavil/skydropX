import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BoxIconFilled from "../../Assets/svg/boxIconFilled";
import LightningIcon from "../../Assets/svg/lightiningIcon";
import LocationIcon from "../../Assets/svg/locationIcon";
import TruckIcon from "../../Assets/svg/truckIcon";
import { InfoData } from "../../Context/InfoProvider";
import styles from './styles.module.scss';

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

const Feedback = ({position}) => {

    const navigate = useNavigate();
    const {codigosPostales, servicePackage, sizePackage, shippingPackage} = useContext(InfoData);

    const size = sizePackage === "S" ? "0 - 1" : sizePackage === "M" ? "2 - 5" : "6 - 10";
    let service = ""
    if (Object.keys(servicePackage).length !== 0){
        service = Object.keys(servicePackage)[0].includes("standard") ? "estándar" : "express";
    }

    const shipping = shippingPackage === "EST" ? estafeta :
                    shippingPackage === "CAR" ? carsa :
                    shippingPackage === "RED" ? redPack :
                    shippingPackage === "SEN" ? sendEx :
                    fedEx

    console.log(codigosPostales, servicePackage, sizePackage, shippingPackage);
    
    useEffect(()=> {
        !codigosPostales.origen && navigate('/')
    })

    return(
        <div className={styles.feedbackContainer}
        style={{
            position: "absolute",
            left: position.x,
            top: position.y,
            width: shippingPackage ? 'calc(100vw - 170px)': null
        }}
        >   
            <div className={styles.feedbackComponent}>
                <LocationIcon className={styles.icon}/>
                <div className={styles.formatContainer}>
                    <h3 className={styles.title}>Origen</h3>
                    <h3 className={styles.content}>{codigosPostales.origen}</h3>
                </div>
                <div className={styles.line}></div>
                <div className={styles.formatContainer}>
                    <h3 className={styles.title}>Destino</h3>
                    <h3 className={styles.content}>{codigosPostales.destino}</h3>
                </div>
            </div>

            {sizePackage &&
            <div className={styles.feedbackComponent}>
                <BoxIconFilled className={styles.icon}/>
                <div className={styles.formatContainer}>
                    <h3 className={styles.title}>Peso</h3>
                    <h3 className={styles.content}>{size} kg</h3>
                </div>
            </div>
            }

            {Object.keys(servicePackage).length !== 0 && (
            <div className={styles.feedbackComponent}>
                <LightningIcon className={styles.icon}/>
                <div className={styles.formatContainer}>
                    <h3 className={styles.title}>Servicio {service}</h3>
                    <h3 className={styles.content}>${Object.values(servicePackage)[0]} MXN</h3>
                </div>
            </div>
            )}

            {shippingPackage && (
            <div className={styles.feedbackComponent}>
                <TruckIcon className={styles.icon}/>
                <div className={styles.shippingContainer}>
                    <img
                    className={styles.shippingImage}
                    src={shipping}
                    alt="shipping-feedback"
                    />
                </div>
            </div>
            )}
        </div>
    )
}

export default Feedback;