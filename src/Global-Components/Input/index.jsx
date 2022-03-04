import React from 'react';
import styles from './styles.module.scss';

const Input = ({ width, inputName, inputValue, errorMessage, handleChange, referenciaSender = false}) => {

    return (
        <div className={styles.inputFormat}>
            <input type="text" placeholder={`${inputName}${referenciaSender ? ' (opcional)': '*'}`} name={inputName} id={inputName} value={inputValue}
                className={errorMessage !== "" ? styles.inputError : null}
                onChange={(e) => handleChange(e.target.value)}
                style={{width: width}}
            />
            {inputValue !== "" && <h4 className={
                errorMessage ? styles.superTextOrigenError : styles.superTextOrigen
            }>
                {inputName}
            </h4>}
            {errorMessage && <h4 className={styles.errorText}>{errorMessage}</h4>}
        </div>
    )
}

export default Input