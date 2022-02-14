import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

class skydropxService {
    /**
     * 
     * @param {*} postalCode 
     * @returns "city": "Ciudad de México, Ciudad de México" (estado, ciudad)
     */
 
    async getCityByPostalCode(postalCode){
        return await axios.get(BASE_URL + `postal-codes/${postalCode}/city`)
        .then( response => {
            return response.data
        })
    }
    /**
     * 
     * @returns STD o EXP standar, express
     */

    async getPricingService(){
        return await axios.get(BASE_URL + "pricings/services").then (response => {
            return response.data
        })
    }
    /**
     * 
     * @param {*} zip_to 
     * @param {*} zip_from 
     * @param {*} parcel_tag parcel_tag: posibles valores "S", "M" o "L" small, medium o large
     * @param {*} service_tag tipo de servicio "STD" o "EXP" stándard o express respectivamente
     * @returns Recupera las paqueterías disponibles para un tipo de servicio => CARSSA = "CAR", ESTAFETA = "EST", REDPACK = "RED", SENDEX = "SEN", FEDEX = "FED"
     */

    async getAvailableShipping(zip_to, zip_from, parcel_tag, service_tag){
        return await axios.post(BASE_URL + "quotations",{
            zip_to,
            zip_from,
            parcel_tag,
            service_tag
        }).then(response => {
            return response.data
        })
    }
}

export default new skydropxService();