import SideMenu from '@components/sideMenu/SideMenu';
import TopBar from '@components/topBar/TopBar';
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
          {props.children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;