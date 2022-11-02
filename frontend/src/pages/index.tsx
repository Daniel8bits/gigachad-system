import UIButton from '@ui/button/UIButton';
import UIComboBox from '@ui/combobox/UIComboBox';
import UIDatePicker, { UIDate } from '@ui/datepicker/UIDatePicker';
import UITextField from '@ui/textfield/UITextField';
import UITable, { UITableDocument } from '@ui/table/UITable';
import React, { useState, useRef } from 'react';
import useModal from '@hooks/useModal';
import UIModal from '@ui/modal/UIModal';
import UICheckBox from '@ui/checkbox/UICheckbox';
import MainLayout from '@layouts/mainLayout/MainLayout';

interface HomeProps {

}

interface APIType {
  name: string,
  address: string,
  cpf: string,
  ctps: string,
  admissionDate: string
}

const columns = ["Nome", "Endereço", "CPF", "CTPS", "Data Admissão"]

const values: APIType[] = [
  {
    name: "Lucas",
    address: "Centro",
    cpf: "123.456.789-92#0",
    ctps: "??",
    admissionDate: "Hoje"
  },
  {
    name: "Lucas1",
    address: "Centro",
    cpf: "123.456.789-92#1",
    ctps: "??",
    admissionDate: "Hoje"
  },
  {
    name: "Lucas2",
    address: "Centro",
    cpf: "123.456.789-92#2",
    ctps: "??",
    admissionDate: "Hoje"
  },
  {
    name: "Lucas3",
    address: "Centro",
    cpf: "123.456.789-92#3",
    ctps: "??",
    admissionDate: "Hoje"
  },{
    name: "Lucas4",
    address: "Centro",
    cpf: "123.456.789-92#4",
    ctps: "??",
    admissionDate: "Hoje"
  },{
    name: "Lucas5",
    address: "Centro",
    cpf: "123.456.789-92#5",
    ctps: "??",
    admissionDate: "Hoje"
  },{
    name: "Lucas6",
    address: "Centro",
    cpf: "123.456.789-92#6",
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

  const tableDocumentRef = useRef(new UITableDocument({
    data: values, 
    columns, 
    description: data => ({
      id: data.cpf,
      display: {
        name: data.name,
        address: data.address,
        cpf: data.cpf,
        ctps: data.ctps,
        admissionDate: data.admissionDate
      }
    })
    //onRowSelected?: (selectedRow: RawDataType) => void,
    //onRowDoubleClicked?: (selectedRow: RawDataType) => void
  }));

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
        <UITable document={tableDocumentRef.current} />
        <UIModal id={MODAL_TEST}  >
          modal test
        </UIModal>
      </div>
    </MainLayout>
  );
};

export default Home;