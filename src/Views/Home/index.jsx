import React, { useState } from 'react';
import HomeCP from './Home_CP';
import Presentation from './Presentation';

const Home = () => {
    const [cp, setCp] = useState(false)
    


    return (
        <>
            {!cp && <Presentation onClick = {()=> setCp(true)}/>}
            {cp && <HomeCP/>}
        </>
    );
};

export default Home;
