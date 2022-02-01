import { createContext, useEffect} from "react";

export const InfoData = createContext({})

const InfoProvider = ({ children }) => {

    useEffect (()=> {

    }, [])

    return (
        <InfoData.Provider value = {{}}>
            {children}
        </InfoData.Provider>
    )
}

export default InfoProvider;