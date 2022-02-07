import React, { useEffect, useState } from "react";
import styles from './styles.module.scss';
import LogoFooter from "../../Assets/svg/logoFooter";
import { getFullDate } from "../../Utils/getDate";

const FlowBackground = ({children}) => {
    const [date, setDate] = useState({});

    useEffect(()=> {

        const getTime = () => {
            const {minutes, hoursFormatted, ampm, day, month, year} = getFullDate();
            setDate({minutes, hoursFormatted, ampm, day, month, year})
        }
        getTime(); 
        const myTimer = setInterval(getTime, 60000);

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

        </div>
    )
}

export default FlowBackground;