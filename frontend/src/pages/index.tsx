import UIButton from '@ui/button/UIButton';
import UIComboBox, { UIComboItemData } from '@ui/combobox/UIComboBox';
import UIDatePicker, { UIDate } from '@ui/datepicker/UIDatePicker';
import UITextField from '@ui/textfield/UITextField';
import UITable, { UITableDocument } from '@ui/table/UITable';
import React, { useState, useRef, useCallback } from 'react';
import useModal from '@hooks/useModal';
import UIModal from '@ui/modal/UIModal';
import UICheckBox from '@ui/checkbox/UICheckbox';
import ContentLayout from '@layouts/contentLayout/ContentLayout';
import LoginLayout from '@layouts/loginLayout/LoginLayout';
import { Link } from 'react-router-dom';
import { MdChevronRight } from 'react-icons/md'
import {signIn} from '@store/AuthStore'
import Roles from '@utils/enums/Roles';
import { useDispatch } from '@store/Root.store';

interface HomeProps {

}

const Home: React.FC<HomeProps> = () => {

  const dispatch = useDispatch();
  const [keepConnected, setKeepConnected] = useState<boolean>(false);

  const handleSignIn = useCallback(() => {
    dispatch(signIn(Roles.MANAGER))
  }, []);

  return (
    <LoginLayout>
      <h1> LOGIN </h1>
      <h4> Preencha os campos para se conectar </h4>
      <UITextField id='user' label='Email ou CPF'  />
      <UITextField id='password' label='Senha' password  />
      <UICheckBox 
        label='Mantenha-me conectado' 
        value={keepConnected}  
        onAction={setKeepConnected}
      />
      <UIButton onAction={handleSignIn}> Entrar </UIButton>
      <Link to='/forgot-password'> Esqueci minha senha <MdChevronRight  /> </Link>
    </LoginLayout>
  );
};

export default Home;