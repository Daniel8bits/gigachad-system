import UIButton from '@ui/button/UIButton';
import UIComboBox from '@ui/combobox/UIComboBox';
import UIDatePicker, { UIDate } from '@ui/datepicker/UIDatePicker';
import UITextField from '@ui/textfield/UITextField';
import UITable from '@ui/table/UITable';
import React, { useState } from 'react';
import useModal from '@hooks/useModal';
import UIModal from '@ui/modal/UIModal';
import UICheckBox from '@ui/checkbox/UICheckbox';
import MainLayout from '@layouts/mainLayout/MainLayout';

interface HomeProps {

}

const columns = {
  name: "Nome",
  address: "Endereço",
  cpf: "CPF",
  ctps: "CTPS",
  admissionDate: "Data Admissão"
}

const values = [
  {
    name: "Lucas",
    address: "Centro",
    cpf: "123.456.789-92",
    ctps: "??",
    admissionDate: "Hoje"
  },
  {
    name: "Lucas1",
    address: "Centro",
    cpf: "123.456.789-92",
    ctps: "??",
    admissionDate: "Hoje"
  },
  {
    name: "Lucas2",
    address: "Centro",
    cpf: "123.456.789-92",
    ctps: "??",
    admissionDate: "Hoje"
  },
  {
    name: "Lucas3",
    address: "Centro",
    cpf: "123.456.789-92",
    ctps: "??",
    admissionDate: "Hoje"
  },{
    name: "Lucas4",
    address: "Centro",
    cpf: "123.456.789-92",
    ctps: "??",
    admissionDate: "Hoje"
  },{
    name: "Lucas5",
    address: "Centro",
    cpf: "123.456.789-92",
    ctps: "??",
    admissionDate: "Hoje"
  },{
    name: "Lucas6",
    address: "Centro",
    cpf: "123.456.789-92",
    ctps: "??",
    admissionDate: "Hoje"
  }
]

const Home: React.FC<HomeProps> = () => {

  const MODAL_TEST = 'moral-test'
  
  const [modal, updateModal] = useModal(MODAL_TEST)
  const [date, setDate] = useState<UIDate>(UIDate.now());
  const [comboValue, setComboValue] = useState<string | null>(null);
  const [check, setCheck] = useState<boolean>(false);

  const comboItems = {
    mamiferos: ['cachorro', 'gato', 'rato'],
    aves: ['galinha', 'aguia']
  }

  return (
    <MainLayout>
      <div className='pg-home'>
        <UIButton onAction={() => updateModal({open: true})}>open modal</UIButton>
        <br />
        <UITextField id='test' label='test' />
        <br />
        <UIDatePicker id='date-test' label='date-test' value={date} onAction={setDate} />
        <br />
        <UIComboBox id='combo-test' label='combo-test' items={comboItems} value={comboValue} onActionPerformed={setComboValue} allowSearch />
        <br />
        <UICheckBox label='check-test' value={check} onAction={setCheck}  />
        <br />
        <UITable columns={columns} values={values} onClick={(e,item) => console.log(item)} />
        <UIModal id={MODAL_TEST}  >
          modal test
        </UIModal>
      </div>
    </MainLayout>
  );
};

export default Home;