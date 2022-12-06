import React from 'react';
import Box from '../../ui/box/UIBox'

type UITrainingItemProps = {
    id: number
    name: string
    date: string
    owner?: string
    numExercise: number
}
const UITrainingItem = ({ id,name,date,owner, numExercise }: UITrainingItemProps) => {
    return (
        <Box to={`/trainings/view?id=${id}`} className='ui-trainingItem'>
            <div className='info'>
                <span className='name'>{name}</span>
                <small>Criado por: {owner ?? "Você"}</small>
            </div>
            <div className='date'>
                <span className='day'>{new Date(date).toLocaleDateString()}</span>
                <small>Data de Criação</small>
            </div>
            <div className='quantity'>{numExercise} Exercicios</div>
        </Box>
    )
}
export default UITrainingItem;