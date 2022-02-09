import React, { useState } from "react";
import './styles.module.scss';
import BoxSizingIcon from '../../Assets/svg/boxSizingIcon';
import styles from './styles.module.scss';
import BoxSizingIconMedium from "../../Assets/svg/boxSizingIconMedium";
import BoxSizingIconLarge from "../../Assets/svg/boxSizingIconLarge";
import RocketIcon from "../../Assets/svg/rocketIcon";

const Card = ({type = "weight", content, onClick, block, setBlock}) => {

    const [border, setBorder] = useState(false);

    const handleClick = (data) => {
        if (!block){
            setBorder(true)
            setBlock(true)
            setTimeout(()=> {
                setBlock(false)
                onClick(data)
            }, 1500)
        }
    }

    const exp = ["Servicio express", "Entrega estimada: 2-3 días hábiles."]
    const std = ["Servicio estándar", "Entrega estimada: 4-7 días hábiles."]

    switch (type) {
        case "weight":
            let size = content === "0 - 1" ? "small": content === "2 - 5" ? "medium" : "large";
            return(
                <div 
                className={styles.cardWeight}
                onClick={()=> handleClick(size)}
                style={border ? {border: "3px solid #5233EA"}: null}
                >
                    { size === "small" && 
                    <BoxSizingIcon
                    style={{
                        position: "relative",
                        marginTop: "73px",
                    }}
                    />
                    }
                    { size === "medium" &&
                    <BoxSizingIconMedium
                    style={{
                        position: "relative",
                        marginTop: "50px",
                    }}   
                    />
                    }

                    { size === "large" &&
                    <BoxSizingIconLarge
                    style={{
                        position: "relative",
                        marginTop: "30px",
                    }}
                    />
                    }
                    <h1 className={styles.cardTitle}>{content} kg</h1>
                    <h3 className={styles.cardSubtitle}>Medida máxima: 154 cm <br/>lineales*</h3>
                    
                </div>
            );

        case "service":
            return(
                <div className={styles.cardService}
                onClick={()=> handleClick(content)}
                style={border ? {border: "3px solid #5233EA"}: null}
                >
                    <RocketIcon
                    style={{
                        position: "relative",
                        marginTop: "30px",
                    }}
                    />
                    <h2 className={styles.titleService}>${content} MXN</h2>

                    <h3 className={styles.subService1}> {parseInt(content) > 300 ? exp[0] : std[0]}</h3>
                    <h3 className={styles.subService2}> {parseInt(content) > 300 ? exp[1] : std[1]}</h3>

                </div>
            );

        case "shipping":
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