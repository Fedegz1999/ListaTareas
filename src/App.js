import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CrudTareas from './pages/CrudTareas';
import Inicio from './pages/Inicio'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />}/>
        <Route path="/tareas" element={<CrudTareas />} />
      </Routes>
    </Router>
  );
}

export default App;
