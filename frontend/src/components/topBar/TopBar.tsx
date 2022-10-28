import React from 'react';

import {MdMenu} from 'react-icons/md'

interface TopBarProps {
  
}

const TopBar: React.FC<TopBarProps> = () => {
  return (
    <div className='topbar'>
      <button type='button'> <MdMenu  /> </button>
    </div>
  );
};

export default TopBar;