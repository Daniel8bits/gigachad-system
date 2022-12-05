import UIButton from '@ui/button/UIButton';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface TrainingsActionsProps {
  calendar?: boolean
}

const TrainingsActions: React.FC<TrainingsActionsProps> = (props) => {

  const calendar = props.calendar ?? false

  const navigate = useNavigate()

  const addNewTraining = useCallback(() => {
    navigate('/trainings/create')
  }, []);

  const goToCalendar = useCallback(() => {
    navigate('/calendar')
  }, []);

  const goToTrainings = useCallback(() => {
    navigate('/trainings')
  }, []);

  return (
    <div className='trainings-actions'>
      <UIButton onAction={addNewTraining}> Adicionar novo treino </UIButton>
      {!calendar && <UIButton className='right' onAction={goToCalendar}> Ver calendário </UIButton>}
      {calendar && <UIButton className='right' onAction={goToTrainings}> Ver treinos </UIButton>}
    </div>
  );
};

export default TrainingsActions;