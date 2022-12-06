import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import usePopOver from '@hooks/usePopOver'
import UIPopOver from '@ui/popover/UIPopOver'

import { FaCaretDown, FaTimes } from 'react-icons/fa'


interface UIComboBoxItemProps {
  value: string
  active: boolean
  onClick: (e: React.MouseEvent) => void
  className?: string
}

const UIComboBoxItem: React.FC<UIComboBoxItemProps> = (props) => {
  return (
    <button
      type='button'
      className={`${props.className ?? ''} ${props.active ? 'active' : ''}`}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
};

export type UIComboItemData = { value: string, label: string }
export type UIComboItemType = UIComboItemData[] | { [key: string]: UIComboItemData[] }

interface UIComboBoxProps {
  id: string
  name?: string
  template?: string
  items: UIComboItemType
  value: UIComboItemData | null
  onAction: (value: UIComboItemData | null | ((oldValue: UIComboItemData | null) => UIComboItemData)) => void
  label?: string
  allowNull?: boolean
  allowSearch?: boolean
}

const UIComboBox: React.FC<UIComboBoxProps> = (props) => {
  const [items, setItems] = useState<UIComboItemData[] | { [key: string]: UIComboItemData[] }>(props.items)
  const popOverId = `${props.id}__popOver`
  const [popOver, updatePopOver] = usePopOver(popOverId)
  const anchorRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const popOverHeight = useMemo<number | 'auto'>(() => {
    const MAX_ITEMS_TO_BE_AUTO = 5
    if (props.items instanceof Array && props.items.length <= MAX_ITEMS_TO_BE_AUTO) {
      return 'auto'
    }
    const propsItems = props.items as { [key: string]: UIComboItemData[] }
    let numItems = 0
    Object.keys(propsItems).forEach(key => {
      numItems += propsItems[key].length
    })
    if (numItems <= MAX_ITEMS_TO_BE_AUTO) {
      return 'auto'
    }
    return 200
  }, [props.items])

  const openCombo = useCallback(() => {
    if (popOver) {
      updatePopOver({ open: !popOver.open })
    }
    else {
      updatePopOver({ open: true })
    }
  }, [popOver?.open])

  function handleChange(value: UIComboItemData | null) {
    props.onAction(value)
    updatePopOver({ open: false })
  }

  function clearInput() {
    handleChange(null)
  }

  function search() {
    const input = inputRef.current
    const propsItems = props.items
    if (props.allowSearch && propsItems instanceof Array && input) {
      setItems((propsItems as UIComboItemData[]).filter((item) =>
        item.label.search(input.value) > -1
      ))
      updatePopOver({ open: true })
    } else if (props.allowSearch && input && !(propsItems instanceof Array)) {
      setItems(oldItems => {
        const newItems = {} as { [key: string]: UIComboItemData[] }
        Object.keys(props.items).forEach((key) => {
          const newItemsValue = (propsItems[key] as UIComboItemData[]).filter((item: UIComboItemData) => item.label.search(input.value) > -1)
          if (newItemsValue.length > 0) {
            newItems[key] = newItemsValue
          }
        })
        return newItems
      })
    }
  }

  function getOptions(): JSX.Element {
    if (props.items instanceof Array) {
      const propsItems = props.items
      return (
        <div className='combobox-items'>
          {(propsItems as UIComboItemData[]).map((item, key) => {
            return (
              <UIComboBoxItem
                key={key}
                value={item.label}
                active={item.value === props.value?.value}
                onClick={() => handleChange(propsItems[key])}
              />
            )
          })}
        </div>
      )
    }

    const itemsAsObject = items as { [key: string]: UIComboItemData[] }
    const propsItemsAsObject = props.items as { [key: string]: UIComboItemData[] }

    return (
      <div className='combobox-items'>
        {Object.keys(itemsAsObject).map((collection, collectionKey) => (
          <div key={collectionKey}>
            <h5> {collection} </h5>
            <div>
              {itemsAsObject[collection].map((item: UIComboItemData, itemKey: number) => {
                return (
                  <UIComboBoxItem
                    key={itemKey}
                    value={item.label}
                    active={item.value === props.value?.value}
                    onClick={() => handleChange(propsItemsAsObject[collection][itemKey])}
                  />
                )
              })}
            </div>
          </div>
        ))}
      </div>
    )
  }

  useEffect(() => {
    if (inputRef.current) {
      if (props.value) {
        inputRef.current.value = props.value.label
      } else {
        inputRef.current.value = ''
      }
    }
  }, [props.value]);


  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = props.value?.label ?? ''
    }
  }, []);

  return (
    <div className={`ui-combobox ${props.allowSearch ? 'allow-search' : ''} ${props.template ?? ''}`}>
      {props.label &&
        <label htmlFor={props.id} className="font-bebas ">
          {props.label}
        </label>}
      <div
        ref={anchorRef}
        onClick={openCombo}
        className='combobox-input'
      >
        <input
          ref={inputRef}
          readOnly={!props.allowSearch}
          id={props.id}
          type="text"
          onKeyUp={search}
        />
        <input
          name={props.name ?? props.id}
          type="hidden"
          value={props.value?.value}
        />
        {!!props.allowNull && props.value &&
          <button
            type='button'
            onClick={clearInput}
          >
            <FaTimes />
          </button>}
        <div>
          <FaCaretDown />
        </div>
      </div>
      <UIPopOver
        id={popOverId}
        anchor={anchorRef}
        template="primary"
        width="anchor"
        height={popOverHeight}
        position="bottom"
      >
        {props.allowNull &&
          <UIComboBoxItem
            value=''
            active={props.value === null}
            onClick={() => handleChange(null)}
          />}
        {getOptions()}
      </UIPopOver>
    </div>
  );
};

export default UIComboBox;