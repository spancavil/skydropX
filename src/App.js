import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './Views/Home';
import './Styles/Global.scss';
import DefineWeight from './Views/DefineWeight';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/definir-peso" element ={<DefineWeight/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
