import React, { useCallback, useRef } from 'react';

import {MdMenu, MdOutlineNotifications} from 'react-icons/md'
import AvatarPNG from '@images/avatar.png'
import DropDown, { useDropDown } from '@components/dropDown/DropDown';

interface TopBarProps {
  setOpenSideMenu: StateSetter<boolean>
}

const TopBar: React.FC<TopBarProps> = (props) => {

  const anchorRef = useRef<HTMLImageElement>(null);
  const [, updateDropDown] = useDropDown()

  const openDropDown = useCallback(() => {
    updateDropDown({open: true})
  }, [])

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
        <img 
          src={AvatarPNG} 
          alt="profile" 
          ref={anchorRef} 
          onClick={openDropDown}
        />
      </div>
      <DropDown anchor={anchorRef}  />
    </div>
  );
};

export default TopBar;