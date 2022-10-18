import UIButton from '@ui/button/UIButton';
import UITextField from '@ui/textfield/UITextField';
import React from 'react';

interface HomeProps {
  
}

const Home: React.FC<HomeProps> = () => {
  return (
    <div className='pg-home'>
      <UIButton onAction={() => console.log('oi :3')}>click me</UIButton>
      <UITextField id='test' label='test'  />
    </div>
  );
};

export default Home;