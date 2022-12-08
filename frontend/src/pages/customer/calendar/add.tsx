

import React, { useEffect, useMemo, useState } from 'react'
import CalendarActions, { CalendarActionsMode } from '@components/calendarActions/CalendarActions';
import CustomTemplate from '@templates/customTemplate/CustomTemplate';
import TrainingItem, {ITraining} from '@components/trainingItem/TrainingItem';
import Placeholder from '@components/placeholder/Placeholder';

export default CustomTemplate<ITraining>({
  endpoint: '/training',
  title: 'Adicionar treino',
  body: props => {

    const [day, month, year] = useMemo(() => {
      const params = new URL(location.href).searchParams
      const day = params.get('day')
      const month = params.get('month')
      const year = params.get('year')
      return [day, month, year]
    }, []);

    return (
      <>
        <CalendarActions 
          mode={CalendarActionsMode.ADD_TRAINING} 
          dateTraining={{
            id: '',
            day: day ?? '',
            month: month ?? '',
            year: year ?? ''
          }}
        />
        <br />
        {props.data.map((item) => (
          <TrainingItem
            id={item.id}
            name={item.name}
            date={item.creationDate}
            owner={item.owner}
            numExercise={item.numExercise}
            dateTraining={{
              day: day ?? '', 
              month: month ?? '', 
              year: year ?? ''
            }}
          />
        ))}
        {props.data.length === 0 && (
          <Placeholder message='Você ainda não possui treinos cadastrados' />
        )}
      </>
    )
  },
  displayActions: false
})