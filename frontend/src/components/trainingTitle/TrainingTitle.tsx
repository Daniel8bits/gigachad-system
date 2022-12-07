import React from 'react';

interface TrainingTitleProps {
  title: string
  date: string
}

const TrainingTitle: React.FC<TrainingTitleProps> = (props) => {
  return (
    <div className='training-title'>
      <h2> {props.title} </h2>
      <small> {props.date} </small>
    </div>
  );
};

export default TrainingTitle;