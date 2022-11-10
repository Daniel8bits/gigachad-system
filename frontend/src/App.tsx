import React from 'react';
import usePage from '@hooks/usePage'
import MainLayout from '@layouts/mainLayout/MainLayout';
import LoadingScreen from '@components/loadingScreen/LoadingScreen';

function App() {

  const page = usePage(<LoadingScreen bellowMenu  />)

  return (
    <MainLayout>
      {page}
    </MainLayout>
  )
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
