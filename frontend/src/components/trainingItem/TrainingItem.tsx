import { useDispatch } from '@store/Root.store';
import React, { useCallback } from 'react';
import {set} from '@store/PageStore'
import Box from '@ui/box/UIBox'
import useNavigateWithParams from '@hooks/useNavigateWithParams';
import { useNavigate } from 'react-router-dom';

type UITrainingItemProps = {
    name: string
    date: string
    owner?: string
    numExercise: number
}

const TrainingItem = ({ name, date, owner, numExercise }: UITrainingItemProps) => {

    const navigate = useNavigateWithParams()

    const openTraining = useCallback(() => {
        const query: SerializableMap<string, string> = []
        query.push(['numExercise', String(numExercise)])
        navigate('/trainings', query)
    }, [numExercise, navigate]);

    return (
        <button type='button' className='training-item' onClick={openTraining}>
            <div className='info'>
                <span className='name'>{name}</span>
                <small>Criado por: {owner ?? "Você"}</small>
            </div>
            <div className='date'>
                <span className='day'>{new Date(date).toLocaleDateString()}</span>
                <small>Data de Criação</small>
            </div>
            <div className='quantity'>{numExercise} Exercicios</div>
        </button>
    )
}
export default TrainingItem;