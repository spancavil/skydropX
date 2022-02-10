import { createContext, useEffect, useState} from "react";
import SkydropService from "../Services/Skydrop.service";

export const InfoData = createContext({})

const InfoProvider = ({ children }) => {

    const [codigosPostales, setCodigosPostales] = useState({origen: "", destino: ""})
    const [stateAndCity, setStateAndCity] = useState(
        {stateOrigen: "", stateDestino: "", cityOrigen: "", cityDestino: ""})

    const [sizePackage, setSizePackage] = useState(""); 
    const [servicePackage, setServicePackage] = useState("")
    const [shippingPackage, setShippingPackage] = useState("")

    // const [servicePrices, setServicePrice] = useState({})
    
    const WEIGHTS = ["0 - 1", "2 - 5", "6 - 10"]
    const SERVICE_TYPES = ["359", "249"]

    const getShippingServices = async () => {
        let serviceSTDoEXP = parseInt(servicePackage) > 300 ? "EXP" : "STD"
        const response = await SkydropService.getAvailableShipping(
            codigosPostales.origen, codigosPostales.destino, sizePackage, serviceSTDoEXP)
        console.log(response);
        return (response.result);
    }

    useEffect (()=> {

        // (async ()=> {
        //     const response = await SkydropService.getPricingService()
        //     console.log(response);
        //     if (response) {
        //      setServicePrice(Object.values(response.result))
        //     }
        // })()

    }, [])

    return (
        <InfoData.Provider 
        value = {
            {setCodigosPostales, setStateAndCity, setSizePackage, setServicePackage, setShippingPackage, getShippingServices,
            codigosPostales, stateAndCity, servicePackage, sizePackage, shippingPackage,
            WEIGHTS, SERVICE_TYPES}}
        >
            {children}
        </InfoData.Provider>
    )
}

export default InfoProvider;