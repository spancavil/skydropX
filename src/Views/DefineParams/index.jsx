import React, {useContext, useState} from "react";
import Card from "../../Global-Components/Card";
import Feedback from "../../Global-Components/Feedback";
import FlowBackground from "../../Global-Components/FlowBackground";
import styles from './styles.module.scss';
import InfoIcon from '../../Assets/svg/infoIcon';
import { InfoData } from "../../Context/InfoProvider";

const DefineParams = () => {

    const [weight, setWeight] = useState(true)
    const {WEIGHTS, codigosPostales} = useContext(InfoData);

    const defineSize = (size) => {
        console.log(size);
    }

    //setWeight(false);

    return(
        <FlowBackground>
            <div className={styles.container}>
                <Feedback 
                position={{x: "135px", y: "92px"}}
                codigosPostales = {codigosPostales}
                />
                <h1 className={styles.title}>¿Cuál es el peso de tu envío?</h1>
                <div className={styles.cardContainer}>
                    {WEIGHTS.map(weight => {
                        return <Card type="weight" content={weight} key={weight} onClick={defineSize}/>
                    })}
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