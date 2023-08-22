import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import NoPage from './components/NoPage';
import Responce from './components/Responce';

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>} />
          <Route path="*" element={<NoPage/>} />
        </Route>

      </Routes>
    </BrowserRouter> 
    // <Responce/>
  );
}

export default App;
