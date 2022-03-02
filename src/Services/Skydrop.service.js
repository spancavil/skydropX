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
        return await axios.get(BASE_URL + `postal-codes/${postalCode}/city`, {
            headers: {
                "Access-Control-Allow-Origin": "*",
            }
        })
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
        return await axios.get(BASE_URL + `pricings/services/${size}`, {
            headers: {
                "Access-Control-Allow-Origin": "*",
            }
        }).then(response => {
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
        }, {
            headers: {
                "Access-Control-Allow-Origin": "*",
            }
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
        return await axios.get(BASE_URL + "pricings/oxxo", {
            headers: {
                "Access-Control-Allow-Origin": "*",
            }
        })
            .then(response => {
                return response.data
            })
    }

    async getCategories() {
        return await axios.get(BASE_URL + "consignment-notes/categories", {
            headers: {
                "Access-Control-Allow-Origin": "*",
            }
        })
            .then(response => {
                return response.data
            })
    }

    async getSubcategories(categoryId) {
        return await axios.get(BASE_URL + `consignment-notes/categories/${categoryId}/subcategories`, {
            headers: {
                "Access-Control-Allow-Origin": "*",
            }
        })
            .then(response => {
                return response.data
            })
    }

    async getClasses(subcategoryId) {
        return await axios.get(BASE_URL + `consignment-notes/subcategories/${subcategoryId}/classes`, {
            headers: {
                "Access-Control-Allow-Origin": "*",
            }
        })
            .then(response => {
                console.log(response.data);
                return response.data
            })
    }
    /**
     * 
     * @param {*} address_from "province": "Ciudad de México",
       "city": "Ciudad de México",
       "name": "Jose Fernando",
       "zip": "12000",
       "country": "MX",
       "address1": "Av. Principal #234",
       "company": "skydropx",
       "address2": "Centro",
       "phone": "5555555555",
       "email": "skydropx@email.com",
       "reference": ""
     * @param {*} address_to idem address_from (pero la reference es OBLIGATORIA)
     * @param {*} parcel_tag "S M o L"
     * @param {*} consignment_note_class_code "El código de la clase"
     * @param {*} consignment_note_subcategory_code "El ID (id ojo eh, el código NO) de la subcategoría"
     * @param {*} service_tag "STD o EXP"
     * @param {*} courier_tag "CAR, EST, FED, RED, SEN, es decir la empresa de envío"
     * @param {*} method_tag "OTH o OXX (otro u oxxo)"
     * @returns 
     */
    async createShipmentAndLabel(
        address_from,
        address_to,
        parcel_tag,
        consignment_note_class_code,
        consignment_note_subcategory_code,
        service_tag,
        courier_tag,
        method_tag) {
        console.log(address_from,
            address_to,
            parcel_tag,
            consignment_note_class_code,
            consignment_note_subcategory_code,
            service_tag,
            courier_tag,
            method_tag);
        return await axios.post(BASE_URL + 'shipments', {
            address_from,
            address_to,
            parcel_tag,
            consignment_note_class_code,
            consignment_note_subcategory_code,
            service_tag,
            courier_tag,
            method_tag
        }, {
            headers: {
                "Access-Control-Allow-Origin": "*",
            }
        }).then(response => {
            console.log(response);
            return response.data;
        })
    }

    async resendLabel(order_id, email) {
        return await axios.post(BASE_URL + 'shipments/email-label', {
            order_id,
            email
        }, {
            headers: {
                "Access-Control-Allow-Origin": "*",
            }
        }).then(response => {
            console.log(response);
            return response.data;
        })
    }
}

export default new skydropxService();