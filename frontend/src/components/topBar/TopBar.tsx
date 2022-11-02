import React from 'react';

import {MdMenu, MdOutlineNotifications} from 'react-icons/md'
import AvatarPNG from '@images/avatar.png'

interface TopBarProps {
  
}

const TopBar: React.FC<TopBarProps> = () => {
  return (
    <div className='topbar'>
      <button type='button'> <MdMenu  /> </button>

      <div>
        <button type='button'> <MdOutlineNotifications  /> </button>
        <img src={AvatarPNG} alt="profile" />
      </div>
    </div>
  );
};

export default TopBar;