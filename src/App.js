import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './Views/Home';
import './Styles/Global.scss';
import DefineParams from './Views/DefineParams';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/definir-parametros" element ={<DefineParams/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
