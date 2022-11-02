import SideMenu from '@components/sideMenu/SideMenu';
import TopBar from '@components/topBar/TopBar';
import UIScroll from '@ui/scroll/UIScroll';
import React from 'react';

interface MainLayoutProps {
  children: any
}

const MainLayout: React.FC<MainLayoutProps> = (props) => {
  return (
    <div className='main-layout'>
      <TopBar  />
      <div className='content'>
        <SideMenu  />
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