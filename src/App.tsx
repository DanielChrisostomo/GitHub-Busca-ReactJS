import React from 'react';
import { GlobalStyle } from './styles/global';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Perfil from './Components/Perfil';

function App() {
  return (
    <>
      <GlobalStyle />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="perfil/:id" element={<Perfil />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
