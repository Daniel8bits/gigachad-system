import UIButton from '@ui/button/UIButton';
import React from 'react';

interface HomeProps {
  
}

const Home: React.FC<HomeProps> = () => {
  return (
    <div className='pg-home'>
      <UIButton onAction={() => console.log('oi :3')}>click me</UIButton>
    </div>
  );
};

export default Home;