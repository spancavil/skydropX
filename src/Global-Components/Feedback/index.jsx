import React from "react";
import LocationIcon from "../../Assets/svg/locationIcon";
import styles from './styles.module.scss';

const Feedback = ({position, origenDestino, peso = true, servicio = null}) => {
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
                    <h3 className={styles.content}>20202</h3>
                </div>
                <div className={styles.line}></div>
                <div className={styles.formatContainer}>
                    <h3 className={styles.title}>Destino</h3>
                    <h3 className={styles.content}>40202</h3>
                </div>
            </div>
            {peso && (
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