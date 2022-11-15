import React from 'react';

interface LoginLayoutProps {
  children: React.ReactNode
}

const LoginLayout: React.FC<LoginLayoutProps> = (props) => {
  return (
    <div className='login-layout'>
      <div className='login-panel'>
        {props.children}
      </div>
    </div>
  );
};

export default LoginLayout;