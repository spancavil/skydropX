import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

class skydropxService {
    /**
     * 
     * @param {*} postalCode 
     * @returns "city": "Ciudad de México, Ciudad de México" (estado, ciudad)
     */

    async getCityByPostalCode(postalCode) {
        console.log(BASE_URL);
        return await axios.get(BASE_URL + `postal-codes/${postalCode}/city`)
            .then(response => {
                return response.data
            })
    }
    /**
     * 
     * @param {*} size S M o L => small medium o large
     * @returns 
     */
    async getPricingService(size) {
        return await axios.get(BASE_URL + `pricings/services/${size}`).then(response => {
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

    async getAvailableShipping(zip_to, zip_from, parcel_tag, service_tag) {
        return await axios.post(BASE_URL + "quotations", {
            zip_to,
            zip_from,
            parcel_tag,
            service_tag
        }).then(response => {
            console.log(response.data);
            return response.data
        })
    }
    /**
     * 
     * @returns Los tipos de delivery disponible. El "delivery" es el precio base, "parcel reception" sería el costo adicional
     */
    async getDeliveryTypes() {
        return await axios.get(BASE_URL + "pricings/oxxo")
            .then(response => {
                return response.data
            })
    }

    async getCategories() {
        return await axios.get(BASE_URL + "consignment-notes/categories")
            .then(response => {
                return response.data
            })
    }

    async getSubcategories(categoryId) {
        return await axios.get(BASE_URL + `consignment-notes/categories/${categoryId}/subcategories`)
            .then(response => {
                return response.data
            })
    }

    async getClasses(subcategoryId) {
        return await axios.get(BASE_URL + `consignment-notes/subcategories/${subcategoryId}/classes`)
            .then(response => {
                console.log(response.data);
                return response.data
            })
    }
}

export default new skydropxService();