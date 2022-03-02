import React, {useEffect} from 'react';
import ModalBackground from '../Background';
import styles from './styles.module.scss';
import { textPolicies } from './textPolicies';
import { textTerms } from './textTerms';
import PrivacyIcon from '../../../../Assets/svg/privacyIcon';

const Terms = ({handleClose, width, height, type}) => {
  useEffect(() => {
    const text = type === "terms" ? textTerms : textPolicies
    let privacy = text.split(/\n/);
    // privacy = privacy.filter(line => line !== "");
    let lineaEntera = "";
    for (const line of privacy) {
        if (privacy.indexOf(line) === 0) lineaEntera += `${line}<br/>`;
        else lineaEntera += `<br/>${line}<br/>`
    }
    document.getElementById("contenidoTerms").innerHTML = lineaEntera;
  }, [type])

  return (
    <ModalBackground handleClose={handleClose} width={width} height={height}>
      <div className={styles.iconContainer}>
              <PrivacyIcon/>
      </div>
      <h1 className={styles.title}>{type === "terms" ? "Términos y condiciones" : "Políticas"} de la plataforma digital y sitio web skydropx.com"</h1>
      <div className={styles.privacy}>
        <p id= "contenidoTerms" className={styles.textPrivacy} ></p>
      </div>
    </ModalBackground>
  )
}

export default Terms;
