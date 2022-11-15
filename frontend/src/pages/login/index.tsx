import React from 'react';
import UITextField from '../../ui/textfield/UITextField';
import UICheckBox from '../../ui/checkbox/UICheckbox';
import UIButton from '../../ui/button/UIButton';

const Login: React.FC = () => {
  
  
  return (
    <div className='Login'>
        <div>
            <h1>LOGIN</h1>
            <span>Preencha os campos para se conectar</span>

            <form>
                <UITextField id="cpf" label="CPF ou email"/>
                <UITextField id="cpf" label="Senha" password/>

            </form>

        </div>
    </div>
  );
};

export default Login;