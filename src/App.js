import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './Views/Home';
import './Styles/Global.scss';
import DefineParams from './Views/DefineParams';
import Impresion from './Views/Impresion';
import ErrorPdf from './Views/ErrorPdf';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Impresion/>}/>
        <Route path="/definir-parametros" element ={<DefineParams/>}/>
        <Route path="/impresion" element={<Impresion/>}/>
        <Route path="/error-pdf" element = {<ErrorPdf/>}/>
        <Route path ="*" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
