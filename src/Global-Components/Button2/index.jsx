import React from 'react';
import styles from './styles.module.scss';

const Button2 = ({text, width, canContinue, handleContinue}) => {
    return (
        <>
            {
                canContinue ?
                <button className={styles.buttonContinueEnabled}
                    onClick={() => handleContinue()}
                    style = {{
                        width
                    }}
                >
                    Continuar
                </button>
                :
                <button className={styles.buttonContinueDisabled}
                style = {{
                    width
                }}
                >
                    Continuar
                </button>
            }
        </>
    )
}

export default Button2