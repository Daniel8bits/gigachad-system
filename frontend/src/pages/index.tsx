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
import { signIn, AuthAccount } from '@store/AuthStore'
import Roles from '@utils/enums/Roles';
import { useDispatch } from '@store/Root.store';
import Form from '@utils/Form';
import axios from '@utils/axios';
import { IUser } from 'gigachad-shareds/models';
import {IoMdEye, IoMdEyeOff} from 'react-icons/io'

interface HomeProps {

}

interface Login {
  data: AuthAccount
}

const Home: React.FC<HomeProps> = () => {

  const dispatch = useDispatch();
  const [keepConnected, setKeepConnected] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSignIn = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Form(e.currentTarget);
    try {

      const { data } = await axios.post<Login>("/account/login", formData).then(({ data }) => data);
      dispatch(signIn(data))
    } catch (e: unknown) {
      console.log(e);
    }
  }, []);

  return (
    <LoginLayout onSubmit={handleSignIn}>
      <h1> LOGIN </h1>
      <h4> Preencha os campos para se conectar </h4>
      <UITextField id='login' label='Email ou CPF' defaultValue='76463745049'/>
      <UITextField 
        id='password' 
        label='Senha' 
        password={!showPassword} 
        defaultValue='login123'
        icon={showPassword ? IoMdEyeOff : IoMdEye}
        iconPosition='right'
        onClickIcon={() => setShowPassword(v => !v)}
      />
      <UICheckBox
        label='Mantenha-me conectado'
        value={keepConnected}
        onAction={setKeepConnected}
      />
      <UIButton submit> Entrar </UIButton>
      <Link to='/forgot-password'> Esqueci minha senha <MdChevronRight /> </Link>
    </LoginLayout>
  );
};
// onAction={(handleSignIn)}

export default Home;