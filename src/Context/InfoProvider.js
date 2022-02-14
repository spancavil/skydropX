import { createContext, useEffect, useState} from "react";
import SkydropService from "../Services/Skydrop.service";
import SwalAlert from "../Utils/sweetAlert";

export const InfoData = createContext({})

const InfoProvider = ({ children }) => {

    const [codigosPostales, setCodigosPostales] = useState({origen: "", destino: ""})
    const [stateAndCity, setStateAndCity] = useState(
        {stateOrigen: "", stateDestino: "", cityOrigen: "", cityDestino: ""})

    const [sizePackage, setSizePackage] = useState(""); 
    const [servicePackage, setServicePackage] = useState("")
    const [shippingPackage, setShippingPackage] = useState("")

    const [shippingAvailable, setShippingAvailable] = useState(null)
    
    const [SERVICE_TYPES, setSERVICE_TYPES] = useState([])
    const WEIGHTS = ["0 - 1", "2 - 5", "6 - 10"]

    const getShippingServices = async () => {
        try {
            let serviceSTDoEXP = parseInt(servicePackage) > 300 ? "EXP" : "STD"
            const response = await SkydropService.getAvailableShipping(
                codigosPostales.origen, codigosPostales.destino, sizePackage, serviceSTDoEXP)
            console.log(response);
            return (response.result);
        } catch (error) {
            alert(error.message)
        }
    }

    useEffect (()=> {

        (async ()=> {
            try {
                const response = await SkydropService.getPricingService()
                if (response) {
                 setSERVICE_TYPES(Object.values(response.result))
                }
            } catch (error) {
                SwalAlert("No se pudo establecer comunicación con el servidor: " + error.message);
            }
        })()

    }, [])

    return (
        <InfoData.Provider 
        value = {
            {setCodigosPostales, setStateAndCity, setSizePackage, setServicePackage, setShippingPackage, getShippingServices, setShippingAvailable, 
            codigosPostales, stateAndCity, servicePackage, sizePackage, shippingPackage, shippingAvailable,
            WEIGHTS, SERVICE_TYPES}}
        >
            {children}
        </InfoData.Provider>
    )
}

export default InfoProvider;