import UIButton from '@ui/button/UIButton';
import UIComboBox, { UIComboItemType } from '@ui/combobox/UIComboBox';
import UIDatePicker, { UIDate } from '@ui/datepicker/UIDatePicker';
import UITextField from '@ui/textfield/UITextField';
import UITable from '@ui/table/UITable';
import React, { useState } from 'react';

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
  const [date, setDate] = useState<UIDate>(UIDate.now());
  const [comboValue, setComboValue] = useState<string | null>(null);

  const comboItems = {
    mamiferos: ['cahorro', 'gato', 'rato'],
    aves: ['galinha', 'aguia']
  }

  return (
    <div className='pg-home'>
      <UIButton onAction={() => console.log('oi :3')}>click me</UIButton>
      <UITextField id='test' label='test' />
      <UIDatePicker id='date-test' label='date-test' value={date} onAction={setDate} />
      <UIComboBox id='combo-test' label='combo-test' items={comboItems} value={comboValue} onActionPerformed={setComboValue} allowSearch />
      <br />
      <UITable columns={columns} values={values} onClick={(e,item) => console.log(item)} />
    </div>
  );
};

export default Home;