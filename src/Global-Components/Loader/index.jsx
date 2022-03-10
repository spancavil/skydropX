import React from 'react';
import styles from './styles.module.scss';
import loader from '../../Assets/img/loaderProgress.png'

const Loader = ({text}) => {
  return (
    <div className={styles.loaderContainer}>
        <img src={loader} alt="loader" className={styles.loader}/>
        {text && <h2 className={styles.text}>{text}</h2>}    
    </div>
  )
}

export default Loader