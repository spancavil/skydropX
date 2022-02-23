import React, { useEffect, useState } from 'react';
import HomeCP from './Home_CP';
import Presentation from './Presentation';

const Home = () => {
    const [cp, setCp] = useState(false)
    const [launcher, setLauncher] = useState(null)

    useEffect(() => {

        const launcherFn = () => {
            setLauncher(document.getElementById("launcher"));
        }

        const repetir = setInterval(launcherFn, 500);

        if (launcher !== null) {
            launcher.style.left = "46px";
            launcher.style.bottom = "35px";
            launcher.style.transform = "scale(1.5)";
            clearInterval(repetir)
        }
        return () => {
            clearInterval(repetir)
        }
    }, [launcher, setLauncher]);

    return (
        <div>
            {!cp && <Presentation onClick={() => setCp(true)} />}
            {cp && <HomeCP />}
        </div>
    );
};

export default Home;
