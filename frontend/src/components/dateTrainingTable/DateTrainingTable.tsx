import React, { useEffect, useRef, useState } from 'react';
import type * as ICalendar from 'gigachad-shareds/endpoint/Calendar'
import UICheckBox from '@ui/checkbox/UICheckbox';
import {MdInfoOutline} from 'react-icons/md'
import { Link } from 'react-router-dom';
import UIBox from '@ui/box/UIBox';

interface DateTrainingTableProps {
  training: ICalendar.ICalendar|null
  doneItemsRef:React.MutableRefObject<Map<number, boolean>>
}

const DateTrainingTable: React.FC<DateTrainingTableProps> = (props) => {

  const [, setUpdater] = useState<boolean>(false);
  const doneItemsRef = props.doneItemsRef;
  //const doneItemsRef = useRef<Map<number, boolean>>(new Map<number, boolean>());

  useEffect(() => {
    if(!props.training) return
    props.training.ExerciseItem.forEach(item => {
      doneItemsRef.current.set(item.idExercise, !!item.DateDoneItem)
    })
    setUpdater(u => !u)
  }, [props.training]);

  return (
    <UIBox className='date-training-table' >
      <table>
        <thead>
          <tr>
            <th> Exercício </th>
            <th> Repetições </th>
            <th> Séries </th>
            <th> Peso </th>
            <th> Concluído </th>
          </tr>
        </thead>
        <tbody>
          {props.training?.ExerciseItem.map(item => {
            const done = doneItemsRef.current.get(item.idExercise) ?? false
            return (
              <tr>
                <td> {item.Exercise.name} </td>
                <td> {item.repetition} </td>
                <td> {item.series} </td>
                <td> {item.weight} Kg </td>
                <td> 
                  <UICheckBox 
                    label=''  
                    value={done} 
                    onAction={value => {
                      doneItemsRef.current.set(item.idExercise, value as boolean)
                      setUpdater(u => !u)
                    }}
                  /> 
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </UIBox>
  );
};

export default DateTrainingTable;