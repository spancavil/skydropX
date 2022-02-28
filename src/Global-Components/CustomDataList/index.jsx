import React, { useEffect, useState } from 'react';
import flecha from '../../Assets/img/flechaSelect.png';
import styles from './styles.module.scss';

const CustomDataList = ({ data = [], onSelect, disabled = false, type }) => {

    const [input, setInput] = useState("");
    const [hideList, setHideList] = useState(true);
    const [focus, setFocus] = useState(!disabled);
    const [dataArranged, setDataArranged] = useState([]);
    const [hideArrow, setHideArrow] = useState(false);

    const handleFocus = () => {
        setHideList(false)
    }

    const handleInput = (value) => {
        setInput(value);
        const dataFilter = data.filter(item => item.attributes.name.toLowerCase().includes(value.toLowerCase()))
        setDataArranged(dataFilter);
    }

    const handleSelect = (item) => {
        setInput(item?.attributes?.name);
        onSelect(item);
        setFocus(false);
        setHideList(true);
        setHideArrow(true);
    }

    useEffect(()=> {
        setDataArranged(data)
    }, [data, setDataArranged])

    useEffect(()=> {
        setFocus(!disabled)
    }, [disabled])

    console.log(`${type}: ${disabled}`);
    
    return (
        <>
            <div className={styles.selectContainer}
                style={focus ? { border: "2px solid black" } : null}
                onClick={handleFocus}
            >
                <input
                    className={styles.selectInput}
                    value={input}
                    onChange={(e) => handleInput(e.target.value)}
                    disabled={disabled}
                    placeholder={type}
                />
                {!hideArrow && 
                    <img
                        src={flecha}
                        alt="arrow"
                    />
                }
            </div>
            {!hideList &&
                <div className={styles.datalist}>
                    {dataArranged.map(item => {
                        return <h2
                                    key={item.id}
                                    className={styles.dataItem}
                                    onClick={() => handleSelect(item)}>
                                    {item?.attributes?.name}
                                </h2>
                    })}
                </div>
            }
        </>
    )
}

export default CustomDataList