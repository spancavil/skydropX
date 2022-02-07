import React from "react";
import Card from "../../Global-Components/Card";
import Feedback from "../../Global-Components/Feedback";
import FlowBackground from "../../Global-Components/FlowBackground";
import styles from './styles.module.scss'

const DefineParams = () => {
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
            </div>
        </FlowBackground>
    )
}

export default DefineParams;