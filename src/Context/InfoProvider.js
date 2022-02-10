import { createContext, useEffect, useState} from "react";

export const InfoData = createContext({})

const InfoProvider = ({ children }) => {

    const [codigosPostales, setCodigosPostales] = useState({origen: "", destino: ""})
    const [stateAndCity, setStateAndCity] = useState(
        {stateOrigen: "", stateDestino: "", cityOrigen: "", cityDestino: ""})

    const [sizePackage, setSizePackage] = useState(""); 
    const [servicePackage, setServicePackage] = useState("")
    const [shippingPackage, setShippingPackage] = useState("")

    const WEIGHTS = ["0 - 1", "2 - 5", "6 - 10"]
    const SERVICE_TYPES = ["359", "249"]

    useEffect (()=> {

    }, [])

    return (
        <InfoData.Provider 
        value = {
            {setCodigosPostales, setStateAndCity, setSizePackage, setServicePackage, setShippingPackage,
            codigosPostales, stateAndCity, servicePackage, sizePackage, shippingPackage,
            WEIGHTS, SERVICE_TYPES}}
        >
            {children}
        </InfoData.Provider>
    )
}

export default InfoProvider;