import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Views/Home';
import './Styles/Global.scss';
import DefineParams from './Views/DefineParams';
import Impresion from './Views/Impresion';
import ErrorPdf from './Views/ErrorPdf';
import { useState, useEffect, useContext } from 'react';
import { InfoData } from './Context/InfoProvider';
import HomeCP from './Views/Home/Home_CP';
import EnvioExitoso from './Views/EnvioExitoso';
import useScript from './Hooks/useScript';

const mouseflowUrl = process.env.REACT_APP_MOUSEFLOW;


function App() {

  console.log(mouseflowUrl);

  const { setFullScreen } = useContext(InfoData);
  const [launcher, setLauncher] = useState(null)

  //Mouseflow scripts loads
  useScript(mouseflowUrl)

  //Detect changes on fullscreen and set corresponding state
  useEffect(() => {
    const elemento = document.body
    elemento.addEventListener('fullscreenchange', () => {
      setFullScreen(fullscreen => !fullscreen);
    })


  }, [setFullScreen])

  useEffect(() => {
    
    //Moves launcher when its available
    const launcherFn = () => {
      setLauncher(document.getElementById("launcher"));
    }
    const repetir = setInterval(launcherFn, 500);
    if (launcher !== null) {
      launcher.style.bottom = "35px";
      launcher.style.left = "10px";
      launcher.style.transform = "scale(1.5)";
      clearInterval(repetir)
    }
    return ()=> {
      clearInterval(repetir);
    }
    
  }, [launcher, setLauncher]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/codigos-postales" element ={<HomeCP />} />
        <Route path="/definir-parametros/:paramId" element={<DefineParams />} />
        <Route path="/impresion" element={<Impresion />} />
        <Route path="/error-pdf" element={<ErrorPdf />} />
        <Route path="/envio-exitoso" element={<EnvioExitoso/>} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
