import { createContext, useState } from "react";
import SkydropService from "../Services/Skydrop.service";
import SwalAlert from "../Utils/sweetAlert";
// import pdf from '../Assets/shipping.pdf'

export const InfoData = createContext({})

const InfoProvider = ({ children }) => {

    const [fullscreen, setFullScreen] = useState(Document.fullScreenElement);
    const [codigosPostales, setCodigosPostales] = useState({origen: "", destino: ""})
    const [stateAndCity, setStateAndCity] = useState(
        {stateOrigen: "", stateDestino: "", cityOrigen: "", cityDestino: ""})

    const [sizePackage, setSizePackage] = useState(""); 
    const [servicePackage, setServicePackage] = useState({});
    const [shippingPackage, setShippingPackage] = useState("");
    const [senderDataCtx, setSenderDataCtx] = useState({});
    const [receiverDataCtx, setReceiverDataCtx] = useState({});
    const [subcategoryIdCtx, setSubcategoryIdCtx] = useState("");
    const [classCodeCtx, setClassCodeCtx] = useState("");
    const [claseNombre, setClaseNombre] = useState("");

    const [shippingAvailable, setShippingAvailable] = useState(null);
    
    const [SERVICE_TYPES, setSERVICE_TYPES] = useState([]);
    const WEIGHTS = ["0 - 1", "2 - 5", "6 - 10"];

    const [deliveryTypes, setDeliveryTypes] = useState([])
    const [deliveryTypeSelected, setDeliveryTypeSelected] = useState({})

    const [linkPdf, setLinkPdf] = useState('/shipping.pdf');
    const [order_id, setOrder_id] = useState('');

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

    const getShippingServices = async (service) => {
        try {
            let serviceSTDoEXP = service.includes("standard") ? "STD" : "EXP"
            const response = await SkydropService.getAvailableShipping(
                codigosPostales.origen, codigosPostales.destino, sizePackage, serviceSTDoEXP)
            return (response.result);
        } catch (error) {
            SwalAlert("Error de comunicación con el servidor: " + error.message)
        }
    }

    const getDeliveryTypes = async () => {
        try {
            let response = await SkydropService.getDeliveryTypes();
            setDeliveryTypes([
                {OXX: response.result["delivery"] + response.result["parcelReception"]},
                {OTH: response.result["delivery"]}
            ])
        } catch (error) {
            SwalAlert("Error de comunicación con el servidor: " + error.message)
        }
    }

    const resetValues = () => {
        setCodigosPostales("")
        setStateAndCity({stateOrigen: "", stateDestino: "", cityOrigen: "", cityDestino: ""})
        setSizePackage("");
        setServicePackage("");
        setShippingPackage("");
        setLinkPdf("");
        setSenderDataCtx({});
        setReceiverDataCtx({});
        setSubcategoryIdCtx({});
        setClassCodeCtx("");
        setClaseNombre("");
        setDeliveryTypeSelected({})
        setOrder_id("");
    }

    return (
        <InfoData.Provider 
        value = {
            {setFullScreen, setCodigosPostales, setStateAndCity, setSizePackage, setServicePackage, setShippingPackage, getShippingServices, setShippingAvailable, getServices, setSenderDataCtx, setReceiverDataCtx, getDeliveryTypes, setDeliveryTypeSelected, setSubcategoryIdCtx, setClassCodeCtx, setClaseNombre, setLinkPdf, setOrder_id, resetValues,
            fullscreen, codigosPostales, stateAndCity, servicePackage, sizePackage, shippingPackage, shippingAvailable, senderDataCtx, receiverDataCtx, deliveryTypes, deliveryTypeSelected, subcategoryIdCtx, classCodeCtx, claseNombre, linkPdf, order_id,
            WEIGHTS, SERVICE_TYPES
        }}
        >
            {children}
        </InfoData.Provider>
    )
}

export default InfoProvider;