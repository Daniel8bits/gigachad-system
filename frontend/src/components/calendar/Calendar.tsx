import React, {
	useState,
	useMemo,
	useRef,
	useEffect,
	useCallback
} from 'react';
import UIButton from '@ui/button/UIButton'

import {
	FaCaretLeft,
	FaCaretRight
} from 'react-icons/fa'

import {
	MdAdd
} from 'react-icons/md'

import { UIDate } from '@ui/datepicker/UIDatePicker';
import Endpoint from '@middlewares/Endpoint';
import { Link, useNavigate } from 'react-router-dom';

interface CalendarDayProps {
	day: number
	training: IDateTraining
	otherMonth: boolean
	date: {
		day: number,
		month: number,
		year: number
	}
}

const CalendarDay: React.FC<CalendarDayProps> = (props) => {

	const navigate = useNavigate()

	const addTraining = useCallback(() => {
		navigate(`/calendar?day=${props.date.day}&month=${props.date.month}&year=${props.date.year}`)
	}, [props.date.day, props.date.month, props.date.year]);

	const query = useMemo(() => {
		if(!props.training) return '/calendar'
		const id = props.training.idtraining
		const date = new Date(props.training.date)
		return `/calendar?id=${id}&day=${date.getDate()}&month=${date.getMonth()+1}&year=${date.getFullYear()}`
	}, [props.training])

	return (
		<div className={`calendar-day ${props.training || props.otherMonth ? '' : 'no-training'}`}>
			<h6> {props.day} </h6>
			{!props.otherMonth && !props.training && <UIButton onAction={addTraining}> <MdAdd  /> </UIButton>}
			{props.training && <Link className='day-training' to={query}> {props.training.Training.name} </Link>}
		</div>
	)
}


interface CalendarProps {
}

type IDateTraining = {
	Training: {
		name: string
	}
	date: string
	idtraining: number
}

const Calendar: React.FC<CalendarProps> = (props) => {
	const [date, setDate] = useState<UIDate>(UIDate.now());
	const [trainings, setTrainings] = useState<IDateTraining[]>([]);

	//const [day, setDay] = useState<number>(new Date().getDate())
	const monthDays = useMemo<number[][]>(() => {
		const weeks = []
		const currentMonthLastDate = UIDate.getLastDateOf(date.getMonth(), date.getYear())
		const previousMonth = UIDate.getLastDateOf(date.getMonth() - 1, date.getYear())
		const day1Week = new UIDate(
			1,
			date.getMonth(),
			date.getYear()
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
	}, [date])

	const decrementMonth = () => {
		const newDate = UIDate.getLastDateOf(date.getMonth() - 1, date.getYear())
		setDate(new UIDate(
			date.getDay(),
			newDate.getMonth(),
			newDate.getYear()
		))
	}

	const incrementMonth = () => {
		const newDate = UIDate.getLastDateOf(date.getMonth() + 1, date.getYear())
		setDate(new UIDate(
			date.getDay(),
			newDate.getMonth(),
			newDate.getYear()
		))
	}

	useEffect(() => {
		new Endpoint<IDateTraining>('/calendar', false)
			.get({month: date.getMonth()+1, year: date.getYear()})
			.then(setTrainings)
			.catch(console.log)
	}, [date]);

	return (
		<div className='calendar'>
			<div className="month-control">
				<UIButton onAction={decrementMonth}> <FaCaretLeft /> </UIButton>
				<div>{`${date.getMonthName()}, ${date.getYear()}`}</div>
				<UIButton onAction={incrementMonth}> <FaCaretRight /> </UIButton>
			</div>
			<div className='container'>
				<div className="days-of-week">
					{['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((value, key) => {
						return <div key={`${value}${key}`}> {value} </div>
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
								const training = trainings.filter(t => new Date(t.date).getDate() === day)[0]
								return (
									<div
										key={day}
										className={`${day < 0 || day > 100 ? 'from-other-month' : ''}`}
									>
										<CalendarDay 
											day={value} 
											training={training}  
											otherMonth={day < 0 || day > 100}
											date={{
												day: value,
												month: date.getMonth()+1,
												year: date.getYear()
											}}
										/>
									</div>
								)
							})}
						</div>
					)
				})}
			</div>
		</div>
	);
};


export default Calendar;