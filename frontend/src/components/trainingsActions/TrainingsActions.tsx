import UIButton from '@ui/button/UIButton';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '@utils/axios';

export enum TrainingActionsMode {
  DEFAULT,
  VIEW_EXERCISE,
  EDIT_EXERCISE,
  CREATE_EXERCISE
}

interface TrainingsActionsProps {
  calendar?: boolean
  mode?: TrainingActionsMode
  trainingId?: number
}

const TrainingsActions: React.FC<TrainingsActionsProps> = (props) => {

  const mode = props.mode ?? TrainingActionsMode.DEFAULT

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

  const goToViewMode = useCallback(() => {
    if(props.trainingId !== undefined)
      navigate(`/trainings?id=${props.trainingId}`)
  }, []);

  const goToEditMode = useCallback(() => {
    if(props.trainingId !== undefined)
      navigate(`/trainings?edit=1&id=${props.trainingId}`)
  }, []);

  const deleteTraining = useCallback(() => {
    if(props.trainingId !== undefined) {
      axios.delete(`/training/${props.trainingId}`).then(() => {
        navigate("/trainings")
      })
      // TODO: deletar o exercicio e retornar ao /trainings caso tenha removido com sucesso
    }
  }, []);


  if(mode === TrainingActionsMode.CREATE_EXERCISE) {
    return (
      <div className='trainings-actions'>
        <UIButton className='right' onAction={goToTrainings}> Voltar </UIButton>
        <UIButton template='warning' submit> Salvar </UIButton>
      </div>
    )
  }
  
  if(props.trainingId !== undefined && mode === TrainingActionsMode.VIEW_EXERCISE) {
    return (
      <div className='trainings-actions'>
        <UIButton onAction={addNewTraining}> Adicionar novo treino </UIButton>
        <UIButton className='right' onAction={goToTrainings}> Voltar </UIButton>
        <UIButton onAction={goToEditMode}> Editar </UIButton>
        <UIButton template='alert' onAction={deleteTraining}> Deletar </UIButton>
      </div>
    )
  }

  if(props.trainingId !== undefined && mode === TrainingActionsMode.EDIT_EXERCISE) {
    return (
      <div className='trainings-actions'>
        <UIButton className='right' onAction={goToViewMode}> Voltar </UIButton>
        <UIButton template='warning' submit> Salvar </UIButton>
      </div>
    )
  }

  return (
    <div className='trainings-actions'>
      <UIButton onAction={addNewTraining}> Adicionar novo treino </UIButton>
      {!props.calendar && <UIButton className='right' onAction={goToCalendar}> Ver calendário </UIButton>}
      {props.calendar && <UIButton className='right' onAction={goToTrainings}> Ver treinos </UIButton>}
    </div>
  );
};

export default TrainingsActions;