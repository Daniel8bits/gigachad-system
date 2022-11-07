import React from 'react';

import {MdMenu, MdOutlineNotifications} from 'react-icons/md'
import AvatarPNG from '@images/avatar.png'

interface TopBarProps {
  setOpenSideMenu: StateSetter<boolean>
}

const TopBar: React.FC<TopBarProps> = (props) => {
  return (
    <div className='topbar'>
      <button 
        type='button'
        onClick={() => props.setOpenSideMenu(openSideMenu => !openSideMenu)}
      > 
        <MdMenu  /> 
      </button>

      <div>
        <button type='button'> <MdOutlineNotifications  /> </button>
        <img src={AvatarPNG} alt="profile" />
      </div>
    </div>
  );
};

export default TopBar;