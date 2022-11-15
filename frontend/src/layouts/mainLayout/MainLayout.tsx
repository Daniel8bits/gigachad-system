import SideMenu from '@components/sideMenu/SideMenu';
import TopBar from '@components/topBar/TopBar';
import UIScroll from '@ui/scroll/UIScroll';
import React, { useState } from 'react';

interface MainLayoutProps {
  children: any
}

const MainLayout: React.FC<MainLayoutProps> = (props) => {
  const [openSideMenu, setOpenSideMenu] = useState<boolean>(true);
  return (
    <div className='main-layout'>
      <TopBar setOpenSideMenu={setOpenSideMenu}  />
      <div className='content'>
        <SideMenu open={openSideMenu}  />
        <main>
          <UIScroll maxHeight={window.innerHeight-40}>
            {props.children}
          </UIScroll>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;