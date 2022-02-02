import React, {useState} from 'react';
import Arrow from '../../../../Assets/svg/arrow';
import styles from './styles.module.scss'

const OrigenDestino = () => {

    const [origen, setOrigen] = useState("");
    const [destino, setDestino] = useState("");

    const handleOrigen = (value) => {
        if (value.length <= 5){
            setOrigen(value.replace(/[^0-9]/g, ''))
        }
    }

    const handleDestino = (value) => {
        if (value.length <= 5){
            setDestino(value.replace(/[^0-9]/g, ''))
        }
    }

    const handleContinue = () => {
        alert("Se continuará con el llamado a la API");
    }

    return (
        <div className={styles.container}>
            <div className={styles.inputContainer}>
                <input type="text" placeholder='Origen' name="Origen" id="origen" value={origen}
                onChange={(e)=> handleOrigen(e.target.value)}
                />
                {origen !== "" && <h4 className={styles.superTextOrigen}>Origen</h4>}
                <Arrow/>
                <input type="text" placeholder='Destino' name="Destino" id="destino" value={destino}
                onChange={(e)=> handleDestino(e.target.value)}
                />
                {destino !== "" && <h4 className={styles.superTextDestino}>Destino</h4>}
            </div>
            {
                origen.length === 5 && destino.length === 5 ?
                <button className={styles.buttonContinueEnabled}
                onClick={()=> handleContinue()}
                >
                    Continuar
                </button>
                :
                <button className={styles.buttonContinueDisabled}>
                    Continuar
                </button>
            }
        </div>
    )
};

export default OrigenDestino;
