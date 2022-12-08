import UIButton from '@ui/button/UIButton';
import axios from '@utils/axios';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export enum CalendarActionsMode {
  DEFAULT,
  VIEW_TRAINING,
  ADD_TRAINING
}

interface CalendarActionsProps {
  mode?: CalendarActionsMode
  dateTraining?: {
    id: string
		day: string,
		month: string,
		year: string
	}
  onSave?: () => void
}

const CalendarActions: React.FC<CalendarActionsProps> = (props) => {

  const mode = props.mode ?? CalendarActionsMode.DEFAULT

  const navigate = useNavigate()

  const addNewTraining = useCallback(() => {
    navigate('/trainings?create=1')
  }, []);

  const goToCalendar = useCallback(() => {
    navigate('/calendar')
  }, []);

  const goToTrainings = useCallback(() => {
    navigate('/trainings')
  }, []);

  const deleteDateTraining = useCallback(() => {
    if(props.dateTraining !== undefined) {
      const {id,...params} = props.dateTraining;
      axios.delete(`/calendar/${id}`,{
        params
      }).then(() => {
        navigate("/calendar")
      })
    }
  }, [props.dateTraining]);


  if(mode === CalendarActionsMode.ADD_TRAINING) {
    return (
      <div className='calendar-actions'>
        <UIButton onAction={addNewTraining}> Adicionar novo treino </UIButton>
        <UIButton className='right' onAction={goToCalendar}> Voltar </UIButton>
      </div>
    )
  }
  
  if(props.dateTraining !== undefined && mode === CalendarActionsMode.VIEW_TRAINING) {
    return (
      <div className='calendar-actions'>
        <UIButton onAction={addNewTraining}> Adicionar novo treino </UIButton>
        <UIButton className='right' onAction={goToCalendar}> Voltar </UIButton>
        <UIButton template='warning' onAction={props.onSave}> Salvar </UIButton>
        <UIButton template='alert' onAction={deleteDateTraining}> Deletar </UIButton>
      </div>
    )
  }

  return (
    <div className='calendar-actions'>
      <UIButton onAction={addNewTraining}> Adicionar novo treino </UIButton>
      <UIButton className='right' onAction={goToTrainings}> Ver treinos </UIButton>
    </div>
  );
};

export default CalendarActions;