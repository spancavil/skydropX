import React, { useEffect, useState } from "react";
import styles from './styles.module.scss';
import LogoFooter from "../../Assets/svg/logoFooter";
import { getFullDate } from "../../Utils/getDate";
import HelpButton from "../Help-button";

const FlowBackground = ({children}) => {
    const [date, setDate] = useState({});

    const helpFire = () => {
        console.log("Click en ayuda");
    }

    useEffect(()=> {

        const getTime = () => {
            const {minutes, hoursFormatted, ampm, day, month, year} = getFullDate();
            setDate({minutes, hoursFormatted, ampm, day, month, year})
        }
        getTime(); 
        const myTimer = setInterval(getTime, 5000);

        //On return stop the timer
        return(()=> {    
            clearInterval(myTimer)
        })
    }, [setDate])

    return (
        <div className={styles.parentContainer}>
            <header className={styles.appHeader}>
                <LogoFooter
                className = {styles.headerImg}
                />
                <div className={styles.dateContainer}>
                    <h3 className={styles.hour}>{date?.hoursFormatted} : {date?.minutes} {date?.ampm}</h3>
                    <div className={styles.line}></div>
                    <h3 className={styles.fullDate}>{date?.day} {date?.month} {date?.year}</h3>
                </div>
            </header>
            
            {children}

            <HelpButton onClick={helpFire}/>
        </div>
    )
}

export default FlowBackground;