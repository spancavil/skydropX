import React, {useEffect} from 'react';
import ModalBackground from '../Background';
import styles from './styles.module.scss';
import { text } from './text';
import PrivacyIcon from '../../../../../Assets/svg/privacyIcon';

const Privacy = ({handleClose, width, height}) => {
  useEffect(() => {
    console.log(text);
    let privacy = text.split(/\n/);
    privacy = privacy.filter(line => line !== "");
    let lineaEntera = "";
    for (const line of privacy) {
        if (privacy.indexOf(line) === 0) lineaEntera += `${line}<br/>`;
        else lineaEntera += `<br/>${line}<br/>`
    }
    document.getElementById("contenidoPrivacy").innerHTML = lineaEntera;
  }, [])

  return (
    <ModalBackground handleClose={handleClose} width={width} height={height}>
      <div className={styles.iconContainer}>
              <PrivacyIcon/>
      </div>
      <h1 className={styles.title}>Aviso de privacidad</h1>
      <div className={styles.privacy}>
        <p id= "contenidoPrivacy" className={styles.textPrivacy} ></p>
      </div>
    </ModalBackground>
  )
};

export default Privacy;
