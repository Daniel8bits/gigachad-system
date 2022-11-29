import React from 'react';

type UITrainingItemProps = {
    name: string
    date: string
    owner?: string
}
const UITrainingItem = ({ name,date,owner }: UITrainingItemProps) => {
    return (
        <a href='/' className='ui-trainingItem'>
            <div className='info'>
                <span className='name'>{name}</span>
                <small>Criado por: {owner ?? "Você"}</small>
            </div>
            <div className='date'>
                <span className='day'>{new Date(date).toLocaleDateString()}</span>
                <small>Data de Criação</small>
            </div>
            <div className='quantity'>5 exércicios</div>
        </a>
    )
}
export default UITrainingItem;