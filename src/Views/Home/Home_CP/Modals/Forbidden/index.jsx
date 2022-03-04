import React from 'react';
import ModalBackground from '../Background';
import styles from './styles.module.scss';
import BoxIcon from '../../../../../Assets/svg/boxIcon';
import ForbiddenArticles from '../../../../../Assets/svg/forbiddenArticles';

const Forbidden = ({handleClose, width, height}) => {
  return (
      <ModalBackground handleClose={handleClose} width={width} height={height}>
        <div className={styles.iconContainer}>
            <BoxIcon/>
        </div>
        <h1 className={styles.title}>Artículos prohibidos</h1>
        <div className={styles.articles}>
          <div className={styles.container1}>
            <h3 className={styles.body}>
            Considera las siguientes restricciones para realizar tu envío:
            </h3>
            <ul style={{paddingLeft: "35px", listStyle: "disc"}} className ={styles.body}>
                <li><span style={{fontSize: "42px", position:"relative", bottom: "4px", lineHeight: "10px"}}>&#8228;</span> Mercancías peligrosas</li>
                <li><span style={{fontSize: "42px", position:"relative", bottom: "4px", lineHeight: "10px"}}>&#8228;</span> Armas de fuego</li>
                <li><span style={{fontSize: "42px", position:"relative", bottom: "4px", lineHeight: "10px"}}>&#8228;</span> Drogas y otras sustancias prohibidas por la ley </li>
                <li><span style={{fontSize: "42px", position:"relative", bottom: "4px", lineHeight: "10px"}}>&#8228;</span> Piratería</li>
                <li><span style={{fontSize: "42px", position:"relative", bottom: "4px", lineHeight: "10px"}}>&#8228;</span> Restos humanos, órganos o muestras de laboratorio</li>
                <li><span style={{fontSize: "42px", position:"relative", bottom: "4px", lineHeight: "10px"}}>&#8228;</span> Animales vivos, muertos o disecados</li>
                <li><span style={{fontSize: "42px", position:"relative", bottom: "4px", lineHeight: "10px"}}>&#8228;</span> Dinero o equivalentes</li>
                <li><span style={{fontSize: "42px", position:"relative", bottom: "4px", lineHeight: "10px"}}>&#8228;</span> Joyería fina o metales preciosos</li>
                <li><span style={{fontSize: "42px", position:"relative", bottom: "4px", lineHeight: "10px"}}>&#8228;</span> Anuncios o billetes de lotería extranjera</li>
                <li><span style={{fontSize: "42px", position:"relative", bottom: "4px", lineHeight: "10px"}}>&#8228;</span> Cualquier otra mercancía prohibida por la ley</li>
              </ul>
          </div>

          <div className={styles.container2}>
            <h2 className={styles.sub}> Escanea el siguiente código</h2>
            <h3 className={styles.body}>para revisar el listado completo de los artículos prohibidos</h3>
            <ForbiddenArticles className={styles.logo}/>
          </div>

        </div>
      </ModalBackground>
  );
};

export default Forbidden;
