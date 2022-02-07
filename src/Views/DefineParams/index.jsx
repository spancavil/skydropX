import React, {useState} from "react";
import Card from "../../Global-Components/Card";
import Feedback from "../../Global-Components/Feedback";
import FlowBackground from "../../Global-Components/FlowBackground";
import styles from './styles.module.scss';
import InfoIcon from '../../Assets/svg/infoIcon';

const DefineParams = () => {

    const [weight, setWeight] = useState(true)

    //setWeight(false);

    return(
        <FlowBackground>
            <div className={styles.container}>
                <Feedback 
                position={{x: "135px", y: "92px"}}
                origenDestino = {{}}
                />
                <h1 className={styles.title}>¿Cuál es el peso de tu envío?</h1>
                <div className={styles.cardContainer}>
                    <Card type="weight"/>
                    <Card type="weight"/>
                    <Card type="weight"/>
                </div>
                {weight && (
                <div className={styles.subContainer}>
                    <InfoIcon/>
                    <h2 className={styles.subtitle}>*Para calcular los centímetros lineales suma el largo, ancho y alto del paquete.</h2>
                </div>
                )}
            </div>
        </FlowBackground>
    )
}

export default DefineParams;