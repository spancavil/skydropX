import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

class skydropxService {
    async getCityByPostalCode(postalCode){
        return await axios.get(BASE_URL + `postal-codes/${postalCode}/city`)
        .then( response => {
            return response.data
        })
    }

    async getNftMarketplaceList(){
        return await axios.post(BASE_URL + "market/list").then (response => {
            return response.data
        })
    }

    async getNftMarketplaceDetail(seller, uniqueId){
        return await axios.post(BASE_URL + "market/detail",{
            uniqueId,
            seller
        }).then(response => {
            return response.data
        })
    }
}

export default new skydropxService();