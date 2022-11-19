import React from 'react';

interface LoginLayoutProps {
  children: React.ReactNode
  onSubmit?: React.FormEventHandler
}

const LoginLayout: React.FC<LoginLayoutProps> = (props) => {
  return (
    <form onSubmit={props.onSubmit} className='login-layout'>
      <div className='login-panel'>
        {props.children}
      </div>
    </form>
  );
};

export default LoginLayout;