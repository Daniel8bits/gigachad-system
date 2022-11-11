import React from 'react';
import usePage from '@hooks/usePage'
import MainLayout from '@layouts/mainLayout/MainLayout';
import LoadingScreen from '@components/loadingScreen/LoadingScreen';
import MessageBox from '@components/messageBox/MessageBox';
import DialogBox from '@components/dialogBox/DialogBox';

function App() {

  const page = usePage(<LoadingScreen bellowMenu  />)

  return (
    <>
      {page}
      <MessageBox  />
      <DialogBox  />
    </>
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
