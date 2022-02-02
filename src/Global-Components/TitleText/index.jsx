import React from 'react';
import styles from './styles.module.scss';

const TitleText = ({text, style}) => {
    return (
        <h1 
        className={styles.title}
        style={style}
        > 
            {text}
        </h1>
    )
};

export default TitleText;
