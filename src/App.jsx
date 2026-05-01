import { useState } from 'react'
import Inscription from './pages/Inscription'
import Accueil from './pages/Accueil'
import Connexion from './pages/Connexion'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
 return(
  
    <Router>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/connexion" element={<Connexion />} />

      </Routes>
    </Router>
  
);
}

export default App
