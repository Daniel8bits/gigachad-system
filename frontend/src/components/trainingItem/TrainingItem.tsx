import React from 'react'
import Box from '@ui/box/UIBox'

type TrainingItemProps = {
    id: number
    name: string
    date: string
    owner?: string
    numExercise: number
}
const TrainingItem = ({ id,name,date,owner, numExercise }: TrainingItemProps) => {
    return (
        <Box to={`/trainings?id=${id}`} className='training-item'>
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
export default TrainingItem;