import React, { useCallback, useMemo } from 'react'
import Box from '@ui/box/UIBox'
import { useNavigate } from 'react-router-dom'
import Endpoint from '@middlewares/Endpoint'
import type * as ICalendar from 'gigachad-shareds/endpoint/Calendar'

export interface ITraining {
    id: number
    name: string
    creationDate: string
    owner?: string
    numExercise: number
}

type TrainingItemProps = {
    id: number
    name: string
    date: string
    owner?: string
    numExercise: number,
    dateTraining?: {
        day: string, 
        month: string, 
        year: string
    }
}
const TrainingItem = ({ id,name,date,owner, numExercise, dateTraining }: TrainingItemProps) => {

    const navigate = useNavigate()

    const handleSaveDateItem = useCallback(() => {
        if(!dateTraining) return
        new Endpoint<ICalendar.create.Request['body']>('/calendar', false)
            .post({
                id,
                day: dateTraining.day, 
                month: dateTraining.month, 
                year: dateTraining.year
            })
            .then(() => {
                navigate('/calendar')
            })
    }, []);

    const to = useMemo(() => {
        return dateTraining ? undefined : `/trainings?id=${id}`
    }, [id, dateTraining])

    return (
        <Box to={to} className={`training-item ${dateTraining ? 'clickable' : ''}`} onClick={handleSaveDateItem}>
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