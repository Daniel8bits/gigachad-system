import React from 'react';
import usePage from '@hooks/usePage'
import { useLocation } from 'react-router-dom';

function App() {

  const location = useLocation()
  
  const page = usePage(location.pathname)

  return page
}

// <Route path="/home" element={<Home />}  />

/*

return (
    <Routes>
      <Route path="/" element={}  />
      
    </Routes>
  );

*/

export default App;
