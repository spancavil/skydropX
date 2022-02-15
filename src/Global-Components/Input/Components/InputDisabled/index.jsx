import React from 'react'
import styles from './styles.module.scss';

const InputDisabled = ({width, inputName, inputValue}) => {
    console.log(inputValue);
    return (
        <div className={styles.inputFormat}>
            <input type="text" placeholder={inputName} name={inputName} id={inputName} value={inputValue}
                style={{ 
                    width: width,
                }}
                disabled = {true}
            />
            {inputValue !== "" && <h4 className={
                styles.superTextOrigen
            }>
                {inputName}
            </h4>}
        </div>
    )
}

export default InputDisabled