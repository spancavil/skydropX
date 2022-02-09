import React from "react";
import help from '../../Assets/img/helpChat.png';
import styles from './styles.module.scss'

const HelpButton = ({onClick}) => {
    return(
        <div onClick={onClick} className={styles.helpContainer}>
            <img
            alt="help"
            src={help}
            className= {styles.helpIcon} 
            />
            <h2 className={styles.helpText}>Ayuda</h2>
        </div>
    )
}

export default HelpButton;