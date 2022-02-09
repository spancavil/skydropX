import React, {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Arrow from '../../../../Assets/svg/arrow';
import { InfoData } from '../../../../Context/InfoProvider';
//import SkydropService from '../../../../Services/Skydrop.service';
import styles from './styles.module.scss';


const OrigenDestino = () => {

    let navigate = useNavigate()

    const [origen, setOrigen] = useState("");
    const [errorOrigen, setErrorOrigen] = useState("");
    const [destino, setDestino] = useState("");
    const [errorDestino, setErrorDestino] = useState("");

    const {setCodigosPostales} = useContext(InfoData);

    const handleOrigen = (value) => {
        let valorRecortado = origen;
        if (value.length <= 5){
            valorRecortado = value.replace(/[^0-9]/g, '')
            setOrigen(valorRecortado)
        } 
        if (value.length < 5){
            setErrorOrigen("Debe tener 5 dígitos")
        } 
        else if (parseInt(value) === 0){
            setErrorOrigen("Código postal no válido")
        } else {
            setErrorOrigen("")
        }
    }
    
    const handleDestino = (value) => {
        let valorRecortado = destino;
        if (value.length <= 5){
            valorRecortado = value.replace(/[^0-9]/g, '')
            setDestino(valorRecortado)
        }
        if (valorRecortado.length < 5){
            setErrorDestino("Debe tener 5 dígitos")
        } 
        else if (parseInt(valorRecortado) === 0){
            setErrorDestino("Código postal no válido")
        } else {
            
            setErrorDestino("")
        }
    }
    
    const handleContinue = async () => {

        alert("Se continuará con el llamado a la API");
/*         const responseOrigen = await SkydropService.getCityByPostalCode(origen)
        const responseDestino = await SkydropService.getCityByPostalCode(destino)
        if (responseDestino.error !== undefined){
            setErrorDestino("Código postal no válido")
        } else if (responseOrigen.error !== undefined) {
            setErrorOrigen("Código postal no válido")
        } else {
            const responseOrigenSplit = responseOrigen.ciudad.split(',')
            const responseDestinoSplit = responseOrigen.ciudad.split(',')

            setCodigosPostales({
                origen,
                destino
            })
            setCiudades({
                stateOrigen: responseOrigenSplit[0],
                stateDestino: responseDestino[0],
                cityOrigen: responseOrigenSplit[1] || "",
                cityDestino: responseDestinoSplit[1] || ""
            })
            navigate('/definir-peso');
        }
        console.log("origen:", responseOrigen, "destino: ", responseDestino); */
        setCodigosPostales({
            origen,
            destino
        })
        navigate('/definir-peso');
    }

    return (
        <div className={styles.container}>
            <div className={styles.inputContainer}>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <input type="text" placeholder='Origen' name="Origen" id="origen" value={origen}
                    className={errorOrigen !== "" ? styles.inputError: null}
                    onChange={(e)=> handleOrigen(e.target.value)}
                    />
                    {origen !== "" && <h4 className={
                        errorOrigen ? styles.superTextOrigenError: styles.superTextOrigen
                        }>Origen</h4>}
                    {errorOrigen && <h4 className={styles.errorText}>{errorOrigen}</h4>}
                </div>

                <Arrow style={{position: "relative", top: "20px"}}/>

                <div style={{display: "flex", flexDirection: "column"}}>
                    <input type="text" placeholder='Destino' name="Destino" id="destino" value={destino}
                    className={errorDestino !== "" ? styles.inputError: null}
                    onChange={(e)=> handleDestino(e.target.value)}
                    />
                    {destino !== "" && <h4 className={
                        errorDestino ? styles.superTextDestinoError: styles.superTextDestino
                        }>Destino</h4>}
                    {errorDestino && <h4 className={styles.errorText}>{errorDestino}</h4>}
                </div>
            </div>
            {
                !errorDestino && destino.length > 0 && !errorOrigen && origen.length > 0 ?
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
