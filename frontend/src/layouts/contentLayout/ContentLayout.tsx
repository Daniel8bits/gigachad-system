import React from 'react';

interface ContentLayoutProps {
  title?: string
  children: any
}

const ContentLayout: React.FC<ContentLayoutProps> = (props) => {
  return (
    <div className='content-layout'>
      {props.title && <h1> {props.title} </h1>}
      {props.children}
    </div>
  );
};

export default ContentLayout;