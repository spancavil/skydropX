import React, { useState, useContext } from 'react';
import { InfoData } from '../../Context/InfoProvider';
import HomeCP from './Home_CP';
import Presentation from './Presentation';

const Home = () => {

    //En caso que se haya pulsado Regresar desde define-params
    const { CPView } = useContext(InfoData);
    const [cp, setCp] = useState(false)
        
    if (CPView) {
        return (
            <HomeCP />
        )
    }

    else {
        return (
            <div>
                {!cp && <Presentation onClick={() => setCp(true)} />}
                {cp && <HomeCP />}
            </div>
        )
    }
};

export default Home;
