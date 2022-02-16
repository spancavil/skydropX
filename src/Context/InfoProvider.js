import { createContext, useState } from "react";
import SkydropService from "../Services/Skydrop.service";
import SwalAlert from "../Utils/sweetAlert";

export const InfoData = createContext({})

const InfoProvider = ({ children }) => {

    const [codigosPostales, setCodigosPostales] = useState({origen: "", destino: ""})
    const [stateAndCity, setStateAndCity] = useState(
        {stateOrigen: "", stateDestino: "", cityOrigen: "", cityDestino: ""})

    const [sizePackage, setSizePackage] = useState(""); 
    const [servicePackage, setServicePackage] = useState({});
    const [shippingPackage, setShippingPackage] = useState("");
    const [senderDataCtx, setSenderDataCtx] = useState({})
    const [receiverDataCtx, setReceiverDataCtx] = useState({})

    const [shippingAvailable, setShippingAvailable] = useState(null)
    
    const [SERVICE_TYPES, setSERVICE_TYPES] = useState([])
    const WEIGHTS = ["0 - 1", "2 - 5", "6 - 10"]

    const getServices = async (size) => {
        try {
            const response = await SkydropService.getPricingService(size)
            if (response) {
                const values = Object.keys(response.result).map(llave => {
                    const objeto = {}
                    objeto[llave] = response.result[llave]
                    return objeto;
                })
                console.log(values);
                setSERVICE_TYPES(values)
            }
        } catch (error) {
            SwalAlert("Error de comunicación con el servidor: " + error.message);
        }
    }

    const getShippingServices = async () => {
        try {
            let serviceSTDoEXP = parseInt(servicePackage) > 300 ? "EXP" : "STD"
            const response = await SkydropService.getAvailableShipping(
                codigosPostales.origen, codigosPostales.destino, sizePackage, serviceSTDoEXP)
            console.log(response);
            return (response.result);
        } catch (error) {
            SwalAlert("Error de comunicación con el servidor: " + error.message)
        }
    }

    return (
        <InfoData.Provider 
        value = {
            {setCodigosPostales, setStateAndCity, setSizePackage, setServicePackage, setShippingPackage, getShippingServices, setShippingAvailable, getServices, setSenderDataCtx, setReceiverDataCtx,
            codigosPostales, stateAndCity, servicePackage, sizePackage, shippingPackage, shippingAvailable, senderDataCtx, receiverDataCtx,
            WEIGHTS, SERVICE_TYPES
        }}
        >
            {children}
        </InfoData.Provider>
    )
}

export default InfoProvider;