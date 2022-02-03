import React, { useState } from 'react';
import HomeCP from './Home_CP';
import Presentation from './Presentation';

const Home = () => {
    const [cp, setCp] = useState(false)
    


    return (
        <div>
            {!cp && <Presentation onClick = {()=> setCp(true)}/>}
            {cp && <HomeCP/>}
        </div>
    );
};

export default Home;
