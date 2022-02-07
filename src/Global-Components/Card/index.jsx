import React from "react";
import './styles.module.scss';
import BoxSizingIcon from '../../Assets/svg/boxSizingIcon';
import styles from './styles.module.scss';

const Card = ({type = "weight", content}) => {
    switch (type) {
        case "weight":
            return(
                <div className={type = styles.cardWeight}>
                    <BoxSizingIcon
                    style={{
                        position: "relative",
                        marginTop: "73px"
                    }}
                    />
                    <h1 className={styles.cardTitle}>0 - 1 kg</h1>
                    <h3 className={styles.cardSubtitle}>Medida máxima: 154 cm <br/>lineales*</h3>
                    
                </div>
            );
        case "service":
            return(
                <div className={styles.cardService}>
                    
                </div>
            );
        default:
            return(
                <div className={styles.empresaEnvio}>

                </div>
            );
    }
}

export default Card;