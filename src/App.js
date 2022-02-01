import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './Views/Home';
import './Styles/Global.scss';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
