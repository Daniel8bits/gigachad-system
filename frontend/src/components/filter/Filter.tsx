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
  mask?: string
  size: { 
    sm: number,
    md: number,
    lg: number,
    xl: number,
    xxl: number
  }
}

export interface FilterData {
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
  const dateValues = useRef<Map<string, UIDate>>(maps.dateValues)
  const comboValues = useRef<Map<string, UIComboItemData|null>>(maps.comboValues)
  const checkValues = useRef<Map<string, boolean>>(maps.checkValues)

  const [update, setUpdate] = useState<boolean>(false);

  const textfieldRefs = useRef<HTMLInputElement[]>([]);

  const reduceInput = useCallback((inputConfig: InputConfig) => {
    switch(inputConfig.type) {
      case InputType.DATEPICKER:
        return (
          <UIDatePicker 
            id={inputConfig.id} 
            label={inputConfig.title}  
            value={dateValues.current.get(inputConfig.id) as UIDate}
            onAction={(value) => {
              dateValues.current.set(inputConfig.id, value as UIDate)
              setUpdate(update => !update)
            }}
          />
        )
      case InputType.CHECKBOX:
        return (
          <UICheckBox 
            label={inputConfig.title} 
            value={checkValues.current.get(inputConfig.id) as boolean}
            onAction={(value) => {
              checkValues.current.set(inputConfig.id, value as boolean)
              setUpdate(update => !update)
            }}
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
            value={comboValues.current.get(inputConfig.id) as UIComboItemData}
            onAction={(value) => {
              comboValues.current.set(inputConfig.id, value as UIComboItemData)
              setUpdate(update => !update)
            }}
          />
        )
      default:
        return (
          <UITextField 
            id={inputConfig.id} 
            label={inputConfig.title}  
            mask={inputConfig.mask}
            defaultValue={textfieldValues.current.get(inputConfig.id)}
            onAction={value => {textfieldValues.current.set(inputConfig.id, value as string)}}
            onLoad={ref => {
              if(!ref.current) return
              textfieldRefs.current.push(ref.current)
            }}
          />
        )
    }
  }, [update]);

  const handleSearch = useCallback(() => {
    props.onSearch({
      textfieldValues: textfieldValues.current,
      dateValues: dateValues.current,
      checkValues: checkValues.current,
      comboValues: comboValues.current
    })
  }, []);

  const cleanFilter = useCallback(() => {
    textfieldValues.current.forEach((value, key, map) => {
      map.set(key, '')
    })
    textfieldRefs.current.forEach((textfield) => {
      textfield.value = ''
    })
    dateValues.current.forEach((value, key, map) => {
      map.set(key, UIDate.now())
    })
    checkValues.current.forEach((value, key, map) => {
      map.set(key, false)
    })
    comboValues.current.forEach((value, key, map) => {
      map.set(key, null)
    })
    setUpdate(update => !update)
    props.onClean()
  }, []);

  const height = useMemo<number>(() => {
    let height = 40;
    props.inputs.forEach(row => {
      if(
        row.filter(cell => cell.type === InputType.CHECKBOX).length > 0 &&
        row.filter(cell => cell.type !== InputType.CHECKBOX).length === 0
      ) {
        height += 56
        return
      }
      height += 94
    })
    return height
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
          {props.inputs.map((row, rowKey) => (
            <Row key={rowKey}>
              {row.map((cell, columnKey) => (
                <Column {...cell.size} key={columnKey}>
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