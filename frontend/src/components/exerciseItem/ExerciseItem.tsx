import Column from '@layouts/grid/Column';
import Row from '@layouts/grid/Row';
import UIBox from '@ui/box/UIBox';
import UIComboBox, { UIComboItemData } from '@ui/combobox/UIComboBox';
import UITextField from '@ui/textfield/UITextField';
import React from 'react';
import {MdOutlineRemoveCircle} from 'react-icons/md'

export interface IExercises {
  id: number
  selected: UIComboItemData | null
  repetition: string
  series: string
  weight: string
}

interface ExerciseItemProps {
  exercises: UIComboItemData[]
  item: IExercises
  handleChangeExercise: (value: UIComboItemData, index: number) => void
  editMode?: boolean
  onRemove?: () => void
}

const ExerciseItem: React.FC<ExerciseItemProps> = (props) => {

  return (
    <UIBox className="exercise-item">
      <Row>
        <Column lg={2} xl={2} xxl={2}>
          {!props.editMode && <h3> {props.item.selected?.label} </h3>}
          {props.editMode && <UIComboBox
            id={`name[${props.item.id}]`}
            name={`name[${props.item.id}]`}
            items={props.exercises}
            onAction={(value) => props.handleChangeExercise(value as UIComboItemData, Number(props.item.id))}
            value={props.item.selected}
          />}
        </Column>
        <Column lg={3} xl={3} xxl={3}>
          <span className="label">Repetições</span>
          <UITextField 
            id={`repetition[${props.item.id}]`} 
            defaultValue={props.item.repetition} 
            disabled={!props.editMode}
          />
        </Column>
        <Column lg={3} xl={3} xxl={3}>
          <span className="label">Séries</span>
          <UITextField 
            id={`series[${props.item.id}]`} 
            defaultValue={props.item.series} 
            disabled={!props.editMode}
          />
        </Column>
        <Column lg={3} xl={3} xxl={3}>
          <span className="label">Peso</span>
          <UITextField 
            id={`weight[${props.item.id}]`} 
            defaultValue={props.item.weight} 
            disabled={!props.editMode}
          />
        </Column>
        <Column lg={1} xl={1} xxl={1}>
          {props.editMode && <button type='button' onClick={props.onRemove}> <MdOutlineRemoveCircle  /> </button>}
        </Column>
      </Row>
    </UIBox>
  );
};

export default ExerciseItem;