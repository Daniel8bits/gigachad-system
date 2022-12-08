import React, { useEffect, useState } from 'react';
import usePage from '@hooks/usePage'
import MainLayout from '@layouts/mainLayout/MainLayout';
import LoadingScreen from '@components/loadingScreen/LoadingScreen';
import MessageBox from '@components/messageBox/MessageBox';
import DialogBox from '@components/dialogBox/DialogBox';
import { useDispatch } from '@store/Root.store';
import { signIn, AuthAccount } from '@store/AuthStore'
import axios from '@utils/axios';

interface Login {
  data: AuthAccount
}

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const page = usePage()

  useEffect(() => {
    const token = localStorage.getItem("Token_Auth");
    if (token) {

      axios.get<Login>("/account/isAuth").then(({ data }) => data).then(({ data }) => {
        dispatch(signIn(data))
        setLoading(false);
      }).catch(() => {
        setLoading(false);
      });

    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return <LoadingScreen />

  return (
    <>
      {page}
      <MessageBox />
      <DialogBox />
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
