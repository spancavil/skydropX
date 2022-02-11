import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LocationIcon from "../../Assets/svg/locationIcon";
import { InfoData } from "../../Context/InfoProvider";
import styles from './styles.module.scss';

const Feedback = ({position}) => {

    const navigate = useNavigate();
    const {codigosPostales, servicePackage, sizePackage, shippingPackage} = useContext(InfoData);

    console.log(codigosPostales, servicePackage, sizePackage, shippingPackage);

    useEffect(()=> {
        !codigosPostales.origen && navigate('/')
    })

    return(
        <div className={styles.feedbackContainer}
        style={{
            position: "absolute",
            left: position.x,
            top: position.y
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
            }
            {servicePackage && (
            <div className={styles.feedbackComponent}>
                <LocationIcon className={styles.icon}/>
                <div className={styles.formatContainer}>
                    <h3 className={styles.title}>Origen</h3>
                    <h3 className={styles.content}>20202</h3>
                </div>
                <div className={styles.line}></div>
                <div className={styles.formatContainer}>
                    <h3 className={styles.title}>Destino</h3>
                    <h3 className={styles.content}>40202</h3>
                </div>
            </div>
            )}
            {shippingPackage && (
            <div className={styles.feedbackComponent}>
                <LocationIcon className={styles.icon}/>
                <div className={styles.formatContainer}>
                    <h3 className={styles.title}>Origen</h3>
                    <h3 className={styles.content}>20202</h3>
                </div>
                <div className={styles.line}></div>
                <div className={styles.formatContainer}>
                    <h3 className={styles.title}>Destino</h3>
                    <h3 className={styles.content}>40202</h3>
                </div>
            </div>
            )}
        </div>
    )
}

export default Feedback;