import React from 'react';
import Card from '../card/UICard'

type UITrainingItemProps = {
    name: string
    date: string
    owner?: string
    numExercise: number
}
const UITrainingItem = ({ name,date,owner, numExercise }: UITrainingItemProps) => {
    return (
        <Card className='ui-trainingItem'>
            <div className='info'>
                <span className='name'>{name}</span>
                <small>Criado por: {owner ?? "Você"}</small>
            </div>
            <div className='date'>
                <span className='day'>{new Date(date).toLocaleDateString()}</span>
                <small>Data de Criação</small>
            </div>
            <div className='quantity'>{numExercise} Exercicios</div>
        </Card>
    )
}
export default UITrainingItem;