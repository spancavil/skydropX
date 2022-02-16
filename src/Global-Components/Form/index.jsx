import React, { useEffect, useState } from 'react';
import { schemaCalle, schemaCalleNumero, schemaCompleteName, schemaEmail, schemaPhone, schemaReferencias } from '../../Utils/validateForm';
import Input from '../Input';
import InputDisabled from '../Input/Components/InputDisabled';
import styles from './styles.module.scss';

const Form = ({ width, height, codigoPostal, stateAndCity, setData, formSender = false}) => {

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
      setErrorCorreoElectronico("")
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
    const calleYNumero = (value.split(" "));
    if (value === "") {
      setErrorCalle("Este campo es obligatorio")
    }
    else {
      const validateCalle = schemaCalle.validate({ calle: calleYNumero[0] })
      //Validate the last value in the array calleYNumero
      const validateNumero = schemaCalleNumero.validate({ numero: calleYNumero[calleYNumero.length - 1] })
      if (validateCalle.error?.message || validateNumero.error?.message) {
        setErrorCalle("El formato no es válido")
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
          nombreCompleto, correoElectronico, calle, telefono, colonia 
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
          nombreCompleto, correoElectronico, calle, telefono, colonia 
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
          inputName="Nombre Completo"
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
          inputName="Código Postal"
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
          width={'400px'}
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
          inputName="Referencias"
          inputValue={referencias}
          errorMessage={formSender ? "" : errorReferencias}
          handleChange={handleReferencia}
        />
      </div>
    </div>
  )
}

export default Form