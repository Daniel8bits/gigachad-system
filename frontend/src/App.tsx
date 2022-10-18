import Home from '@pages/home/Home';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}  />
      <Route path="/home" element={<Home />}  />
    </Routes>
  );
}

export default App;
