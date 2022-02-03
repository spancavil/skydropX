import React from 'react';
import BoxIcon from '../../../../Assets/svg/boxIcon';
import PrivacyIcon from '../../../../Assets/svg/privacyIcon';
import SupportIcon from '../../../../Assets/svg/supportIcon';
import styles from './styles.module.scss'

const Footer = ({onPrivacy, onForbidden, onSupport}) => {
    return (
        <div className={styles.container}>
            <div className={styles.line1}></div>
            <div className={styles.line2}></div>
            <div className={styles.link} onClick={onPrivacy}>
                <div className={styles.iconContainer}>
                    <PrivacyIcon />
                </div>
                <h1 className={styles.footerText}>
                    Aviso de <br/> privacidad
                </h1>
            </div>
            <div className={styles.link} onClick={onForbidden}>
                <div className={styles.iconContainer}>
                    <BoxIcon />
                </div>
                <h1 className={styles.footerText}>
                    Artículos <br/> prohibidos
                </h1>
            </div>
            <div className={styles.link} onClick={onSupport}>
                <div className={styles.iconContainer}>
                    <SupportIcon />
                </div>
                <h1 className={styles.footerText}>
                    Soporte <br/> al cliente
                </h1>
            </div>
        </div>
    )
};

export default Footer;
