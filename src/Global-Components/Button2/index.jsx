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
                    {text}
                </button>
                :
                <button className={styles.buttonContinueDisabled}
                style = {{
                    width
                }}
                >
                    {text}
                </button>
            }
        </>
    )
}

export default Button2