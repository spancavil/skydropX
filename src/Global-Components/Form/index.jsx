import React, { useContext, useEffect, useState } from 'react';
import { schemaCalle, schemaCompleteName, schemaEmail, schemaPhone, schemaReferencias } from '../../Utils/validateForm';
import Input from '../Input';
import InputDisabled from '../Input/Components/InputDisabled';
import styles from './styles.module.scss';
import {InfoData} from '../../Context/InfoProvider';

const Form = ({ width, height, codigoPostal, stateAndCity, setData, formSender = false, formReceiver = false}) => {

  //Data loaded from context
  const {senderDataCtx, receiverDataCtx} = useContext(InfoData);

  const [firstNavigation, setFirstNavigation] = useState(true);

  //Form states and validations
  const [nombreCompleto, setNombreCompleto] = useState("")
  const [errorNombreCompleto, setErrorNombreCompleto] = useState("")

  const [correoElectronico, setCorreoElectronico] = useState("")
  const [errorCorreoElectronico, setErrorCorreoElectronico] = useState("")

  const [telefono, setTelefono] = useState("")
  const [errorTelefono, setErrorTelefono] = useState("")

  const [calle, setCalle] = useState("")
  const [errorCalle, setErrorCalle] = useState("")

  const [colonia, setColonia] = useState("");
  const [errorColonia, setErrorColonia] = useState("")

  const [referencias, setReferencia] = useState("")
  const [errorReferencias, setErrorReferencia] = useState("");

  //Este efecto lo usamos para cargar los datos del form previos
  useEffect(()=> {

    if (firstNavigation){
      const hayDatosSender = Object.keys(senderDataCtx).length !== 0;
      const hayDatosReceiver = Object.keys(receiverDataCtx).length !== 0;
  
      console.log(`Hay datos sender? ${hayDatosSender}, hay datos receiver? ${hayDatosReceiver}`);
    
      if (hayDatosSender && firstNavigation && formSender){
        console.log("Se modifican los values del sender por unica vez");
        setNombreCompleto(senderDataCtx.address_from.name);
        setCorreoElectronico(senderDataCtx.address_from.email);
        setTelefono(senderDataCtx.address_from.phone);
        setCalle(senderDataCtx.address_from.address1);
        setColonia(senderDataCtx.address_from.address2);
        setReferencia(senderDataCtx.address_from.reference);
      }
  
      if (hayDatosReceiver && firstNavigation && formReceiver){
        console.log("Se modifican los values del receiver por unica vez");
        setNombreCompleto(receiverDataCtx.address_to.name);
        setCorreoElectronico(receiverDataCtx.address_to.email);
        setTelefono(receiverDataCtx.address_to.phone);
        setCalle(receiverDataCtx.address_to.address1);
        setColonia(receiverDataCtx.address_to.address2);
        setReferencia(receiverDataCtx.address_to.reference);
      }
      setFirstNavigation(false);
    }

  },[senderDataCtx, receiverDataCtx, firstNavigation, formSender, formReceiver])

  const handleNombreCompleto = (value) => {
    setNombreCompleto(value);
    const validate = schemaCompleteName.validate({ username: value })
    if (validate.error?.message) {
      setErrorNombreCompleto(validate.error.message)
    } else {
      setErrorNombreCompleto("")
    }
  }

  const handleCorreoElectronico = (value) => {
    setCorreoElectronico(value);
    const validate = schemaEmail.validate({ email: value })
    if (validate.error?.message) {
      setErrorCorreoElectronico(validate.error.message)
    } else {
      if (value.includes("ñ")){
        setErrorCorreoElectronico("La letra ñ es inválida en la dirección de correo electrónico")
      }
      else {
        setErrorCorreoElectronico("")
      }
    }
  }

  const handleTelefono = (value) => {
    setTelefono(value);
    const validate = schemaPhone.validate({ phone: value })
    if (validate.error?.message) {
      setErrorTelefono(validate.error.message)
    } else {
      setErrorTelefono("")
    }
  }

  const handleCalle = (value) => {
    setCalle(value);
    if (value === "") {
      setErrorCalle("Este campo es obligatorio")
    }
    else {
      const validateCalle = schemaCalle.validate({ calle: value })
      //Validate the last value in the array calleYNumero
      if (validateCalle.error?.message) {
        setErrorCalle(validateCalle.error.message)
      } else {
        setErrorCalle("")
      }
    }
  }

  const handleColonia = (value) => {
    setColonia(value);
    //Se utiliza el mismo esquema que complete name.
    const validate = schemaCompleteName.validate({ username: value })
    if (validate.error?.message) {
      setErrorColonia(validate.error.message)
    } else {
      setErrorColonia("")
    }
  }

  const handleReferencia = (value) => {
    setReferencia(value);
    //Se utiliza el mismo esquema que complete name.
    const validate = schemaReferencias.validate({ referencias: value })
    if (validate.error?.message) {
      setErrorReferencia(validate.error.message)
    } else {
      setErrorReferencia("")
    }
  }

  useEffect(()=> {
    if (formSender){

      if (!errorNombreCompleto && 
        !errorCorreoElectronico && 
        !errorCalle && 
        !errorTelefono && 
        !errorColonia && 
        calle &&
        nombreCompleto &&
        correoElectronico &&
        calle &&
        telefono &&
        colonia) {
        setData({
          nombreCompleto, correoElectronico, calle, telefono, colonia, referencia: referencias ? referencias : "" 
        });
      } else {
        setData({})
      }

    } else {
      if (!errorNombreCompleto && 
        !errorCorreoElectronico && 
        !errorCalle && 
        !errorTelefono && 
        !errorColonia &&
        !errorReferencias &&
        calle &&
        nombreCompleto &&
        correoElectronico &&
        calle &&
        telefono &&
        colonia &&
        referencias) {
        setData({
          nombreCompleto, correoElectronico, calle, telefono, colonia, referencia: referencias
        });
      } else {
        setData({})
      }
    }
  }, [setData, errorNombreCompleto, errorCorreoElectronico, errorCalle, errorTelefono, errorColonia, errorReferencias,
    nombreCompleto, correoElectronico, calle, telefono, colonia, referencias, formSender])

  return (
    <div className={styles.container}
      style={{
        width,
        height
      }}
    >
      <h2 className={styles.title}> 
        {formSender ? '¡Falta poco! Ingresa los datos de quien envía el paquete' : 'Ahora, completa los datos de quien recibe el paquete'}
      </h2>
      <h2 className={styles.sub}
        style={{ paddingTop: '24px' }}
      >
        {formSender ? 'Remitente' : 'Destinatario'}
      </h2>
      <div className={styles.remitente}
        style={{
          height: '75px',
        }}
      >
        <Input
          width={'300px'}
          inputName="Nombre completo"
          inputValue={nombreCompleto}
          errorMessage={errorNombreCompleto}
          handleChange={handleNombreCompleto}
        />
        <Input
          width={'300px'}
          inputName="Correo electrónico"
          inputValue={correoElectronico}
          errorMessage={errorCorreoElectronico}
          handleChange={handleCorreoElectronico}
        />
        <Input
          width={'300px'}
          inputName="Teléfono"
          inputValue={telefono}
          errorMessage={errorTelefono}
          handleChange={handleTelefono}
        />
      </div>
      <h2 className={styles.sub}>Dirección</h2>
      <div className={styles.remitente}
        style={{
          height: '75px'
        }}
      >
        <Input
          width={'700px'}
          inputName="Calle y número"
          inputValue={calle}
          errorMessage={errorCalle}
          handleChange={handleCalle}
        />
        <InputDisabled
          width={'226px'}
          inputName="Código postal"
          inputValue={codigoPostal}
        />
      </div>
      <div className={styles.remitente}
        style={{
          padding: "24px",
          height: '115px'
        }}
      >
        <InputDisabled
          width={'305px'}
          inputName="Ciudad y Estado"
          inputValue={`${formSender ? stateAndCity.cityOrigen : stateAndCity.cityDestino}, ${ formSender ? stateAndCity.stateOrigen : stateAndCity.stateDestino}`}
        />
        <Input
          width={'300px'}
          inputName="Colonia"
          inputValue={colonia}
          errorMessage={errorColonia}
          handleChange={handleColonia}
        />
        <Input
          width={'300px'}
          inputName="Referencias"
          inputValue={referencias}
          errorMessage={formSender ? "" : errorReferencias}
          handleChange={handleReferencia}
          referenciaSender={formSender? true : false}
        />
      </div>
    </div>
  )
}

export default Form