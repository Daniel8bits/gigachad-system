import Column from '@layouts/grid/Column';
import Row from '@layouts/grid/Row';
import UIButton from '@ui/button/UIButton';
import UICheckBox from '@ui/checkbox/UICheckbox';
import UIComboBox, { UIComboItemData, UIComboItemType } from '@ui/combobox/UIComboBox';
import UIDatePicker, { UIDate } from '@ui/datepicker/UIDatePicker';
import UITextField from '@ui/textfield/UITextField';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import {FaChevronUp} from 'react-icons/fa'

export enum InputType {
  TEXTFIELD,
  DATEPICKER,
  COMBOBOX,
  CHECKBOX
}

export interface InputConfig {
  id: string
  title: string, 
  type: InputType,
  defaultValue?: unknown
  items?: UIComboItemType
  size: { 
    sm: number,
    md: number,
    lg: number,
    xl: number,
    xxl: number
  }
}

interface FilterData {
  textfieldValues: Map<string, string>
  dateValues: Map<string, UIDate>
  comboValues: Map<string, UIComboItemData|null>
  checkValues: Map<string, boolean>
}

interface FilterProps {
  inputs: InputConfig[][]
  onSearch: (data: FilterData) => void
  onClean: () => void
}

const Filter: React.FC<FilterProps> = (props) => {

  const [open, setOpen] = useState<boolean>(false);

  const maps = useMemo(() => {
    const textfieldValues = new Map<string, string>()
    const dateValues = new Map<string, UIDate>()
    const comboValues = new Map<string, UIComboItemData|null>()
    const checkValues = new Map<string, boolean>()
    props.inputs.forEach(row => row.forEach(cell => {
      switch (cell.type) {
        case InputType.TEXTFIELD:
          textfieldValues.set(cell.id, cell.defaultValue ? `${cell.defaultValue as string|number}` : '')
          break;
        case InputType.DATEPICKER:
          dateValues.set(cell.id, cell.defaultValue as UIDate ?? UIDate.now())
          break;
        case InputType.CHECKBOX:
          checkValues.set(cell.id, cell.defaultValue as boolean ?? false)
          break;
        case InputType.COMBOBOX:
          comboValues.set(cell.id, cell.defaultValue as UIComboItemData ?? null)
          break;
        default:
      }
    }))
    return {
      textfieldValues,
      dateValues,
      comboValues,
      checkValues
    }
  }, [])

  const textfieldValues = useRef<Map<string, string>>(maps.textfieldValues)
  const [dateValues, setDateValues] = useState<Map<string, UIDate>>(maps.dateValues);
  const [comboValues, setComboValues] = useState<Map<string, UIComboItemData|null>>(maps.comboValues);
  const [checkValues, setCheckValues] = useState<Map<string, boolean>>(maps.checkValues);

  const reduceInput = useCallback((inputConfig: InputConfig) => {
    switch(inputConfig.type) {
      case InputType.DATEPICKER:
        return (
          <UIDatePicker 
            id={inputConfig.id} 
            label={inputConfig.title}  
            value={dateValues.get(inputConfig.id) as UIDate}
            onAction={(value) => setDateValues(dateValue => dateValue?.set(inputConfig.id, value as UIDate))}
          />
        )
      case InputType.CHECKBOX:
        return (
          <UICheckBox 
            label={inputConfig.title} 
            value={checkValues.get(inputConfig.id) as boolean}
            onAction={(value) => setCheckValues(checkValues => checkValues?.set(inputConfig.id, value as boolean))}
          />
        )
      case InputType.COMBOBOX:
        if(!inputConfig.items) {
          throw new Error('Items cannot be undefined when input type is COMBOBOX!')
        }
        return (
          <UIComboBox 
            id={inputConfig.id} 
            label={inputConfig.title}  
            items={inputConfig.items}
            value={comboValues.get(inputConfig.id) as UIComboItemData}
            onAction={(value) => setComboValues(comboValues => comboValues?.set(inputConfig.id, value as UIComboItemData))}
          />
        )
      default:
        return (
          <UITextField 
            id={inputConfig.id} 
            label={inputConfig.title}  
            defaultValue={textfieldValues.current.get(inputConfig.id)}
            onAction={value => textfieldValues.current.set(inputConfig.id, value as string)}
          />
        )
    }
  }, []);

  const handleSearch = useCallback(() => {
    props.onSearch({
      textfieldValues: textfieldValues.current,
      dateValues,
      checkValues,
      comboValues
    })
  }, []);

  const cleanFilter = useCallback(() => {
    textfieldValues.current.forEach((value, key, map) => {
      map.set(key, '')
    })
    dateValues.forEach((value, key, map) => {
      map.set(key, UIDate.now())
    })
    checkValues.forEach((value, key, map) => {
      map.set(key, false)
    })
    comboValues.forEach((value, key, map) => {
      map.set(key, null)
    })
    props.onClean()
  }, []);

  const height = useMemo<number>(() => {
    return props.inputs.length * 86 + 40
  }, [props.inputs.length])

  return (
    <div className={`filter ${open ? 'open' : ''}`}>
      <button 
        type='button'
        onClick={() => setOpen(open => !open)}
      > 
        Filtro <FaChevronUp /> 
      </button>
      <div className='filter-content' style={{height: open ? height : 0}}>
        <div className='filter-inputs'>
          {props.inputs.map(row => (
            <Row>
              {row.map(cell => (
                <Column {...cell.size}>
                  {reduceInput(cell)}
                </Column>
              ))}
            </Row>
          ))}
        </div>
        <div className='filter-control'>
          <UIButton onAction={handleSearch}> Pesquisar </UIButton>
          <UIButton onAction={cleanFilter}> Limpar filtro </UIButton>
        </div>
      </div>
    </div>
  );
};

export default Filter;