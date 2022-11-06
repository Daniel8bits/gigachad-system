import React from 'react';

interface LoadingScreenProps {
  bellowMenu?: boolean
}

const LoadingScreen: React.FC<LoadingScreenProps> = (props) => {
  return (
    <div className={`loading-screen ${props.bellowMenu ? 'bellow-menu' : ''}`}>
      <svg enableBackground="new 0 0 26.349 26.35" version="1.1" viewBox="0 0 26.349 26.35" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg">
        <g fill="#7bff65">
          <circle cx="13.792" cy="3.082" r="3.082"/>
          <circle cx="13.792" cy="24.501" r="1.849" fillOpacity=".6"/>
          <circle cx="6.219" cy="6.218" r="2.774" fillOpacity=".9"/>
          <circle cx="21.365" cy="21.363" r="1.541" fillOpacity=".5"/>
          <circle cx="3.082" cy="13.792" r="2.465" fillOpacity=".8"/>
          <circle cx="24.501" cy="13.791" r="1.232" fillOpacity=".4"/>
          <path d="m4.694 19.84c-0.843 0.843-0.843 2.207 0 3.05 0.842 0.843 2.208 0.843 3.05 0 0.843-0.843 0.843-2.207 0-3.05-0.842-0.844-2.207-0.852-3.05 0z" fillOpacity=".7"/>
          <circle cx="21.364" cy="6.218" r=".924" fillOpacity=".3"/>
        </g>
      </svg>
    </div>
  );
};

export default LoadingScreen;