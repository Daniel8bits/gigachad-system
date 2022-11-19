import React, {
  useCallback,
  useEffect,
  useState,
  useMemo,
  useRef
} from 'react';
import UITextField, { UITextFieldProps } from '@ui/textfield/UITextField'
import UIPopOver from '@ui/popover/UIPopOver'
import UIButton from '@ui/button/UIButton'
import usePopOver from '@hooks/usePopOver';

import {
  FaCalendarAlt,
  FaCaretUp,
  FaCaretDown,
  FaCaretLeft,
  FaCaretRight
} from 'react-icons/fa'
import UIScroll from '@ui/scroll/UIScroll';

export class UIDate {
  
  public static MIN_YEAR: number = 1915
  
  private _day: number;
  private _month: number;
  private _year: number;
  
  constructor(day: number, month: number, year: number) {
    this._day = day;
    this._month = month;
    this._year = year;
    this.fix()
    // console.log(this)
  }
  
  public static now(): UIDate {
    const date = new Date()
    return new UIDate(date.getDate(), date.getMonth(), date.getFullYear())
  }
  
  /* 
  Pattern dd/MM/yyyy
  */
  public static parse(value: string): UIDate | never {
    if (!value.match(/^\d{2}\/\d{2}\/\d{4}$/g)) {
      throw new Error('Invalid date format')
    }
    const dateArr = value.split('/')
    return new UIDate(Number(dateArr[0]), Number(dateArr[1]) - 1, Number(dateArr[2]))
  }
  
  public getDay(): number {
    return this._day
  }
  
  public setDay(day: number): void {
    this._day = day
    this.fix()
  }
  
  public getMonth(): number {
    return this._month
  }
  
  public setMonth(month: number): void {
    this._month = month
    this.fix()
  }
  
  public getYear(): number {
    return this._year
  }
  
  public setYear(year: number): void {
    this._year = year
    this.fix()
  }
  
  public before(date: UIDate): boolean {
    return !(
      this._year > date.getYear() ||
      (this._year === date.getYear() && this._month > date.getMonth()) ||
      (this._year === date.getYear() && this._month === date.getMonth() && this._day >= date.getDay())
    )
  }
    
  public after(date: UIDate): boolean {
    return !(
      this._year < date.getYear() ||
      (this._year === date.getYear() && this._month < date.getMonth()) ||
      (this._year === date.getYear() && this._month === date.getMonth() && this._day <= date.getDay())
    )
  }
      
  public getFormattedDate(): string {
    let value = ''
    if (this._day < 10) {
      value += `0${this._day}`
    }
    else {
      value += this._day
    }
    value += '/'
    if (this._month + 1 < 10) {
      value += `0${this._month + 1}`
    }
    else {
      value += this._month
    }
    value += `/${this._year}`
    return value
  }

  public toString(){
    let value = ''
    value += `${this._year}`
    value += '-'
    if (this._month + 1 < 10) {
      value += `0${this._month + 1}`
    }
    else {
      value += this._month
    }
    value += '-';
    if (this._day < 10) {
      value += `0${this._day}`
    }
    else {
      value += this._day
    }
    return value
  }
      
  public getMonthName(): string {
    const monthNameList = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro'
    ]
    return monthNameList[this._month]
  }
      
  private fix() {
    
    if (this._year < UIDate.MIN_YEAR) {
      this._year = UIDate.MIN_YEAR
    }
    
    if (this._month < 0) {
      this._month = 0
    }
    else if (this._month > 11) {
      this._month = 11
    }
    
    switch (this._month) {
      case 0:
      case 2:
      case 4:
      case 6:
      case 7:
      case 9:
      case 11:
        if (this._day > 31) {
          this._day = 31
        }
        break
      case 3:
      case 5:
      case 8:
      case 10:
        if (this._day > 30) {
          this._day = 30
        }
        break
      case 1:
        if (this.isLeap() && this._day > 29) {
          this._day = 29
        }
        else if (!this.isLeap() && this._day > 28) {
          this._day = 28
        }
        break
      default:
        break;
    }
    
    if (this._day < 1) {
      this._day = 1
    }
    
  }
      
  public isLeap(): boolean {
    return this._year % 4 === 0 && (this._year % 100 !== 0 || this._year % 400 === 0)
  }
      
  /* 
  
    Reference: https://www.megacurioso.com.br/matematica-e-estatistica/44513-calendario-humano-como-transformar-seu-cerebro-em-uma-calculadora-de-datas.htm#:~:text=Tome%20como%20exemplo%20o%20dia,foi%20em%20uma%20sexta%2Dfeira.
  
  */
  public getDayOfWeek() {
    
    const a = Math.floor(this._year / 4)
    const b = Math.floor(this._year / 100)
    const c = Math.floor(this._year / 400)
    
    const leapYearsAmount = a - b + c
    
    let daysAmount = leapYearsAmount * 366 + (this._year - leapYearsAmount) * 365
    
    const dayPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    
    for (let i = 0; i < this._month; i++) {
      daysAmount += dayPerMonth[i]
    }
    if (this._month > 1 && this.isLeap()) {
      daysAmount++
    }
    daysAmount += this._day - Number(this.isLeap())
    
    const dayOfWeek = daysAmount % 7
    
    return dayOfWeek === 0 ? 6 : dayOfWeek - 1
    
  }
      
  public static getLastDateOf(month: number, year: number): UIDate {
    const auxMonth = Math.abs(month + 1) % 12
    const auxYear = Math.floor(Math.abs(month + 1) / 12)
    if (month < 0) {
      month = 12 - auxMonth - 1
      year -= auxYear
    }
    else if (month > 11) {
      month = auxMonth - 1
      year += auxYear
    }
    return new UIDate(40, month, year)
  }
      
}
    
enum UIDatePickerPanels {
  WEEKS = 0,
  MONTHS = 1,
  YEARS = 2
}
    
interface UIDatePickerPanelProps {
  value: UIDate
  setPanel: (panel: UIDatePickerPanels) => void
  setDate: (date: UIDate) => void
}
    
    
interface UIDatePickerYears extends UIDatePickerPanelProps {
  ratio: number
}
    
const UIDatePickerYears: React.FC<UIDatePickerYears> = (props) => {
  const YEARS_RANGE = 28
  const activeYear = props.value ?? UIDate.now()
  const [yearPivot, setYearPivot] = useState<number>(new Date().getFullYear());
  const rangeOfYears: number[] = useMemo<number[]>(() => {
    const range = []
    for (let i = yearPivot - (YEARS_RANGE-1); i <= yearPivot; i++) {
      range.push(i)
    }
    return range
  }, [yearPivot])
      
  const decrementYear = useCallback(() => {
    setYearPivot(yearPivot => {
      const newYear = yearPivot - YEARS_RANGE
      if (yearPivot >= 1915) {
        return newYear;
      }
      return 1915
    })
  }, [])
      
  const incrementYear = useCallback(() => {
    setYearPivot(yearPivot => {
      const maxYear = new Date().getFullYear()
      const newYear = yearPivot + YEARS_RANGE
      if (newYear <= maxYear) {
        return newYear;
      }
      return maxYear
    })
  }, [])
      
  const updateDate = (year: number) => {
    props.setDate(new UIDate(
      activeYear.getDay(),
      activeYear.getMonth(),
      year
    ))
    props.setPanel(UIDatePickerPanels.MONTHS)
  }

  return (
    <div className='years-panel'>
      <div className='years-range-control'>
        <UIButton
          className="mb-2 p-2"
          onAction={decrementYear}
        >
          <FaCaretLeft  />
        </UIButton>
        <UIButton
          className="mb-2 p-2"
          onAction={incrementYear}
        >
          <FaCaretRight  />
        </UIButton>
      </div>
      <div className="years">
        {[...Array(YEARS_RANGE/4)].map((value, rowKey) => {
          return (
            <div className='year-row'>
              {[...Array(4)].map((value, columnKey) => {
                const year = rangeOfYears[rowKey*4+columnKey]
                return (
                  <button
                    type='button'
                    key={year}
                    className={`${year === activeYear.getYear() && 'active'}`}
                    onClick={() => updateDate(year)}
                    style={{width: props.ratio/4}}
                  >
                    {year}
                  </button>
                )
              })}
            </div>
          )
        })}
        
      </div>
    </div>
  );
};
          
          
          
interface UIDatePickerMonthsProps extends UIDatePickerPanelProps {
}
          
const UIDatePickerMonths: React.FC<UIDatePickerMonthsProps> = (props) => {
  const activeMonth = props.value ?? UIDate.now()
  const [month, setMonth] = useState<number>(((): number => {
    const currentMonth = new Date().getMonth() + 1
    if (currentMonth % 4 === 0) {
      return currentMonth - 1
    }
    return 4 * (Math.floor(currentMonth / 4) + 1) - 1
  })());
  const rangeOfMonths = useMemo<number[]>(() => {
    const range = []
    for (let i = month - 3; i <= month; i++) {
      range.push(i);
    }
    return range;
  }, [month]);
  const decrementMonth = useCallback(() => {
    setMonth(month => {
      const newMonth = month - 4
      if (newMonth >= 3) {
        return newMonth;
      }
      return 3
    })
  }, [])
            
  const incrementMonth = useCallback(() => {
    setMonth(year => {
      const newMonth = year + 4
      if (newMonth <= 11) {
        return newMonth;
      }
      return 11
    })
  }, [])
            
  const updateDate = (month: number) => {
    props.setDate(new UIDate(
      activeMonth.getDay(),
      month,
      activeMonth.getYear()
    ))
    props.setPanel(UIDatePickerPanels.WEEKS)
  }
  return (
    <>
      <div className="year-control">
        <UIButton
          template="secondary"
          onAction={() => props.setPanel(UIDatePickerPanels.YEARS)}
        >
          {String(activeMonth.getYear())}
        </UIButton>
      </div>
      {/*<UIButton
        className="mb-2 p-2"
        onAction={decrementMonth}
      >
        <FaCaretUp  />
      </UIButton>*/}
      <UIScroll className='months' maxHeight={235}>
        {/*rangeOfMonths.map((value, key) => {
          const monthNameList = [
            'Janeiro',
            'Fevereiro',
            'Março',
            'Abril',
            'Maio',
            'Junho',
            'Julho',
            'Agosto',
            'Setembro',
            'Outubro',
            'Novembro',
            'Dezembro'
          ]
          return (
            <button
              type='button'
              key={monthNameList[value]}
              className={`${value === activeMonth.getMonth() && 'active'}`}
              onClick={() => updateDate(value)}
            >
              {monthNameList[value]}
            </button>
          )
        })*/}
        {
          [
            'Janeiro',
            'Fevereiro',
            'Março',
            'Abril',
            'Maio',
            'Junho',
            'Julho',
            'Agosto',
            'Setembro',
            'Outubro',
            'Novembro',
            'Dezembro'
          ].map((value, key) => {
            return (
              <button
                type='button'
                key={value}
                className={`${key === activeMonth.getMonth() && 'active'}`}
                onClick={() => updateDate(key)}
              >
                {value}
              </button>
            )
          })
        }
      </UIScroll>
      {/*<UIButton
        className="mb-2 p-2"
        onAction={incrementMonth}
      >
        <FaCaretDown  />
      </UIButton>*/}
    </>
  );
};
                
                
                
interface UIDatePickerWeeksProps extends UIDatePickerPanelProps {
  ratio: number
}
                
const UIDatePickerWeeks: React.FC<UIDatePickerWeeksProps> = (props) => {
  const currentMonth = props.value ?? UIDate.now()
  //const [day, setDay] = useState<number>(new Date().getDate())
  const monthDays = useMemo<number[][]>(() => {
    const weeks = []
    const currentMonthLastDate = UIDate.getLastDateOf(currentMonth.getMonth(), currentMonth.getYear())
    const previousMonth = UIDate.getLastDateOf(currentMonth.getMonth() - 1, currentMonth.getYear())
    const day1Week = new UIDate(
      1,
      currentMonth.getMonth(),
      currentMonth.getYear()
    ).getDayOfWeek()
    // filling with current month days
    for (let i = day1Week, day = 1; day < currentMonthLastDate.getDay() + 1; i++, day++) {
      weeks[i] = day
    }
    // filling with previous month days
    for (let i = day1Week - 1, day = previousMonth.getDay(); i >= 0; i--, day--) {
      weeks[i] = -day
    }
    // filling with next month days
    for (let i = day1Week + currentMonthLastDate.getDay(), day = 1; i < 42; i++, day++) {
      weeks[i] = day + 100
    }
    
    const weekMatrix: number[][] = []
    for (let i = 0; i < 6; i++) {
      weekMatrix[i] = []
      for (let j = 0; j < 7; j++) {
        weekMatrix[i][j] = weeks[7 * i + j]
      }
    }
    
    return weekMatrix
  }, [props.value])

  const updateDate = (week: number, weekDay: number) => {  
    let day = monthDays[week][weekDay]
    let month = currentMonth.getMonth()
    let year = currentMonth.getYear()
                    
    if (day < 0) {
      const auxDate = UIDate.getLastDateOf(month - 1, year)
      day = Math.abs(day)
      month = auxDate.getMonth()
      year = auxDate.getYear()
    }
    else if (day > 100) {
      const auxDate = UIDate.getLastDateOf(month + 1, year)
      day -= 100
      month = auxDate.getMonth()
      year = auxDate.getYear()
    }
                    
    props.setDate(new UIDate(
      day,
      month,
      year
    ))
  }

  const decrementMonth = () => {
    const newDate = UIDate.getLastDateOf(currentMonth.getMonth() - 1, currentMonth.getYear())
    props.setDate(new UIDate(
      currentMonth.getDay(),
      newDate.getMonth(),
      newDate.getYear()
    ))
  }
                        
  const incrementMonth = () => {
    const newDate = UIDate.getLastDateOf(currentMonth.getMonth() + 1, currentMonth.getYear())
    props.setDate(new UIDate(
      currentMonth.getDay(),
      newDate.getMonth(),
      newDate.getYear()
    ))
  }
  return (
    <>
      <div className="month-control">
        <UIButton
          className="mb-2 p-2"
          onAction={decrementMonth}
        >
          <FaCaretLeft  />
        </UIButton>
        <UIButton
          template="secondary"
          onAction={() => props.setPanel(1)}
        >
          {`${currentMonth.getMonthName()}, ${currentMonth.getYear()}`}
        </UIButton>
        <UIButton
          className="mb-2 p-2"
          onAction={incrementMonth}
        >
          <FaCaretRight  />
        </UIButton>
      </div>
      <div className="days-of-week">
        {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((value, key) => {
          return (
            <div 
              key={`${value}${key}`} 
              className="font-bebas grow"
              style={{width: props.ratio/7}}
            >
              {value}
            </div>
          )
        })}
      </div>
      {monthDays.map((week, weekKey) => {
        return (
          <div className="week" key={['D0', 'S1', 'T2', 'Q3', 'Q4', 'S5', 'S6'][weekKey]}>
            {week.map((day, dayKey) => {
              let value = day
              if (day < 0) {
                value = Math.abs(value)
              }
              else if (day > 100) {
                value -= 100
              }
              return (
                <button
                  type='button'
                  key={day}
                  className={`${currentMonth.getDay() === day ? 'active' : ''} ${day < 0 || day > 100 ? 'from-other-month' : ''}`}
                  onClick={() => updateDate(weekKey, dayKey)}
                  style={{width: props.ratio/7}}
                >
                  {value}
                </button>
              )
            })}
          </div>
        )
      })}
    </>
  );
};
                                
                                
interface UIDatePickerProps extends Override<UITextFieldProps, {
  value: UIDate
  onAction: (value: UIDate | ((oldValue: UIDate) => UIDate)) => void
}> {
}
                                
const UIDatePicker: React.FC<UIDatePickerProps> = (props) => {
  const POPOVER_SIZE = {
    WIDTH: 270,
    HEIGHT: 315
  }
  const [panel, setPanel] = useState<UIDatePickerPanels>(UIDatePickerPanels.WEEKS)
  const inputRef = useRef<HTMLInputElement>(null)
  const iconButtonRef = useRef<HTMLDivElement>(null)
  const popOverId = `${props.id.trim()}__popOver`
  const {
    onAction,
    onMouseUp,
    onKeyDown,
    value,
    mask,
    className,
    ...inputTextProps 
  } = props;
  const [, updatePopOver] = usePopOver(popOverId)
                                    
  const handleMouseUp = useCallback((e: React.MouseEvent) => {console.log('mouse up')
    if (onMouseUp) onMouseUp(e)
  }, [onMouseUp])
                                    
  /**
  * UIDatePicker default action
  * Occurs when the user insert or pick some date
  * @param event 
  */
  function actionPerformed(event: React.KeyboardEvent): void {
    if(inputRef.current) {
      try {
        onAction(UIDate.parse(inputRef.current.value))
      } catch (e: unknown) {
        onAction(null as unknown as UIDate)
      }
    }
    
    if (onKeyDown) onKeyDown(event)
  }
                                    
  const currentPanel = useMemo<JSX.Element>(() => {
    const panelProps = {
      value: props.value,
      ratio: POPOVER_SIZE.WIDTH,
      setPanel,
      setDate: onAction
    }
    switch (panel) {
      case UIDatePickerPanels.MONTHS:
        return (
          <UIDatePickerMonths {...panelProps} />
        )
      case UIDatePickerPanels.YEARS:
        return (
          <UIDatePickerYears {...panelProps} />
        )
      default:
        return (
          <UIDatePickerWeeks {...panelProps} />
        )
    }
  }, [panel, props.value])
                                          
  useEffect(() => {
    if(value && inputRef.current) {
      inputRef.current.value = value.getFormattedDate()
    }
  }, [value])
                                          
  return (
    <div className={`ui-datepicker ${className ?? ''}`}>
      <UIPopOver
        id={popOverId}
        template="primary"
        width={POPOVER_SIZE.WIDTH}
        height={POPOVER_SIZE.HEIGHT}
        anchor={iconButtonRef as React.MutableRefObject<HTMLDivElement>}
        className="text-white p-1 font-bebas"
      >
      {currentPanel}
      </UIPopOver>
      <UITextField {...inputTextProps}
        id={`${popOverId}_textfield`}
        ref={inputRef}
        mask="{dd/dd/dddd}"
        icon={FaCalendarAlt}
        iconPosition='right'
        onKeyDown={actionPerformed}
        onMouseUp={handleMouseUp}
        onClickIcon={() => updatePopOver({ open: true })}
        iconContainerRef={iconButtonRef}
      />
    </div>
  );
};
                                          
export default UIDatePicker;