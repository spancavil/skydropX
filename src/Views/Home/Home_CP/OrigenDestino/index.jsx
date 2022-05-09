import React, {useContext, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Arrow from '../../../../Assets/svg/arrow';
import { InfoData } from '../../../../Context/InfoProvider';
import SkydropService from '../../../../Services/Skydrop.service';
import SwalAlert from '../../../../Utils/sweetAlert';
import styles from './styles.module.scss';


const OrigenDestino = ({codigosPostales}) => {

    let navigate = useNavigate()

    const [origen, setOrigen] = useState("");
    const [errorOrigen, setErrorOrigen] = useState("");
    const [destino, setDestino] = useState("");
    const [errorDestino, setErrorDestino] = useState("");

    const {setCodigosPostales, setStateAndCity} = useContext(InfoData);

    const handleOrigen = async (value) => {
        let valorRecortado = origen;
        if (value.length <= 5){
            valorRecortado = value.replace(/[^0-9]/g, '')
            setOrigen(valorRecortado)
            if (valorRecortado.length === 5){
                try {
                    await SkydropService.getCityByPostalCode(valorRecortado)
                    setErrorOrigen("")
                } catch (error) {
                    if (error.response?.status === 400){
                        if (error.response.request.responseURL.includes(origen)) setErrorOrigen("Código postal no válido");
                    }
                    else{
                        SwalAlert("Error de comunicación con el servidor: " + error.message)
                    }
                }
            }
        } 
        if (value.length < 5){
            setErrorOrigen("Debe tener 5 dígitos")
        } 
        else if (parseInt(value) === 0){
            setErrorOrigen("Código postal no válido")
        }
    }
    
    const handleDestino = async (value) => {
        let valorRecortado = destino;
        if (value.length <= 5){
            valorRecortado = value.replace(/[^0-9]/g, '')
            setDestino(valorRecortado)
            if (valorRecortado.length === 5){
                try {
                    await SkydropService.getCityByPostalCode(valorRecortado)
                    setErrorDestino("")
                } catch (error) {
                    if (error.response?.status === 400){
                        if (error.response.request.responseURL.includes(destino)) setErrorDestino("Código postal no válido");
                    }
                    else{
                        SwalAlert("Error de comunicación con el servidor: " + error.message)
                    }                
                }
            }
        }
        if (valorRecortado.length < 5){
            setErrorDestino("Debe tener 5 dígitos")
        } 
        else if (parseInt(valorRecortado) === 0){
            setErrorDestino("Código postal no válido")
        }
    }
    
    const handleContinue = async () => {

        try {
        
            const responseOrigen = await SkydropService.getCityByPostalCode(origen)
            const responseDestino = await SkydropService.getCityByPostalCode(destino)
            console.log(responseOrigen);
            if (responseDestino.error !== undefined){
                setErrorDestino("Código postal no válido")
            } else if (responseOrigen.error !== undefined) {
                setErrorOrigen("Código postal no válido")
            } else {
                //console.log(responseOrigen, responseDestino);
                const responseOrigenSplit = responseOrigen.result.city.split(', ')
                const responseDestinoSplit = responseDestino.result.city.split(', ')
    
                setCodigosPostales({
                    origen,
                    destino
                })
                setStateAndCity({
                    stateOrigen: responseOrigenSplit[0],
                    stateDestino: responseDestinoSplit[0],
                    cityOrigen: responseOrigenSplit[1] === "" ? responseOrigenSplit[0]: responseOrigenSplit[1],
                    cityDestino: responseDestinoSplit[1] === "" ? responseDestinoSplit[0] : responseDestinoSplit[1]
                })
                navigate('/definir-parametros/peso');
            }
            
        } catch (error) {
            if (error.response?.status === 400){
                if (error.response.request.responseURL.includes(origen)) setErrorOrigen("Código postal no válido");
                if (error.response.request.responseURL.includes(destino)) setErrorDestino("Código postal no válido");
            }
            else{
                SwalAlert("Error de comunicación con el servidor: " + error.message)
            }
        }
        // console.log("origen:", responseOrigen, "destino: ", responseDestino);
        // setCodigosPostales({
        //     origen,
        //     destino
        // })
        // navigate('/definir-parametros');
    }

    useEffect(()=> {

        if (codigosPostales?.origen !== "" && codigosPostales?.destino !== ""){
            setOrigen(codigosPostales.origen);
            setDestino(codigosPostales.destino);
        }

    }, [codigosPostales])

    return (
        <div className={styles.container}>
            <div className={styles.inputContainer}>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <input type="text" placeholder='Origen' name="Origen" id="origen" value={origen}
                    className={errorOrigen !== "" ? styles.inputError: null}
                    autoComplete = 'off'
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
                    autoComplete = 'off'
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
