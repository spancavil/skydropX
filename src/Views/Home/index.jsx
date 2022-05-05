import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { InfoData } from '../../Context/InfoProvider';
import Presentation from './Presentation';

const Home = () => {

    //En caso que se haya pulsado Regresar desde define-params
    const { CPView } = useContext(InfoData);
    const navigate = useNavigate()

    if (CPView) {
        navigate('/codigos-postales')
    }

    return (
        <div>
            <Presentation onClick={() => navigate('/codigos-postales')} />
        </div>
    )
};

export default Home;
