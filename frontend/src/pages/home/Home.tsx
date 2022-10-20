import UIButton from '@ui/button/UIButton';
import UIDatePicker, { UIDate } from '@ui/datepicker/UIDatePicker';
import UITextField from '@ui/textfield/UITextField';
import React, {useState} from 'react';

interface HomeProps {
  
}

const Home: React.FC<HomeProps> = () => {
  const [date, setDate] = useState<UIDate>(UIDate.now());
  return (
    <div className='pg-home'>
      <UIButton onAction={() => console.log('oi :3')}>click me</UIButton>
      <UITextField id='test' label='test'  />
      <UIDatePicker id='date-test' label='date-test' value={date} onAction={setDate}  />
    </div>
  );
};

export default Home;