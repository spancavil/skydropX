import React from "react";
import './styles.module.scss';
import BoxSizingIcon from '../../Assets/svg/boxSizingIcon';
import styles from './styles.module.scss';
import BoxSizingIconMedium from "../../Assets/svg/boxSizingIconMedium";
import BoxSizingIconLarge from "../../Assets/svg/boxSizingIconLarge";

const Card = ({type = "weight", content, onClick}) => {
    switch (type) {
        case "weight":
            let size = content === "0 - 1" ? "small": content === "2 - 5" ? "medium" : "large";
            console.log(size);
            return(
                <div className={type = styles.cardWeight} onClick={()=> onClick(size)}>
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