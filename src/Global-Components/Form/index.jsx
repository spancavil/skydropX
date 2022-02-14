import React from 'react';
import SwalAlert from '../../Utils/sweetAlert';
import { schemaCompleteName, schemaEmail, schemaPhone } from '../../Utils/validateForm';
import styles from './styles.module.scss';

const Form = ({width, height}) => {
    
    const res1 = schemaCompleteName.validate({username: "SA"});
    const res2 = schemaPhone.validate({phone: "0000000000"})
    const res3 = schemaEmail.validate({email: "alalallalalala"})
    console.log(res1.error?.message);
    console.log(res2.error?.message);
    console.log(res3.error?.message);

    SwalAlert("Este es un error de ejemplo")

  return (
    <div className={styles.container}
    style={{
        width,
        height
    }}
    >

    </div>
  )
}

export default Form