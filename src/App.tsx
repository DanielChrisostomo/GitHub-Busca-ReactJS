import React from 'react'
import { GlobalStyle } from './styles/global';
import {HashRouter, Routes, Route} from 'react-router-dom'
import Home from './Home';
import Perfil from './Perfil';

function App() {
  
  return (
    <>
  <GlobalStyle />
    <HashRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='perfil/:id' element={<Perfil />} />
      </Routes>
    </HashRouter>
    </>
  )
}

export default App
