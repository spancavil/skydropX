import { createContext, useEffect, useState} from "react";

export const InfoData = createContext({})

const InfoProvider = ({ children }) => {

    const [codigosPostales, setCodigosPostales] = useState({origen: "", destino: ""})
    const [stateAndCity, setStateAndCity] = useState(
        {stateOrigen: "", stateDestino: "", cityOrigen: "", cityDestino: ""})

    const WEIGHTS = ["0 - 1", "2 - 5", "6 - 10"]

    useEffect (()=> {

    }, [])

    return (
        <InfoData.Provider 
        value = {{setCodigosPostales, setStateAndCity, codigosPostales, stateAndCity, WEIGHTS}}
        >
            {children}
        </InfoData.Provider>
    )
}

export default InfoProvider;