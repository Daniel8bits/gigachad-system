import React, {
	useState,
	useMemo,
	useRef
} from 'react';
import UIButton from '@ui/button/UIButton'

import {
	FaCaretLeft,
	FaCaretRight
} from 'react-icons/fa'

import { UIDate } from '@ui/datepicker/UIDatePicker';


interface CalendarProps {
}

const Calendar: React.FC<CalendarProps> = (props) => {
	const [date, setDate] = useState<UIDate>(UIDate.now());

	const containerRef = useRef<HTMLDivElement>(null);
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

	const updateDate = (week: number, weekDay: number) => {
		let day = monthDays[week][weekDay]
		let month = date.getMonth()
		let year = date.getYear()

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

		setDate(new UIDate(
			day,
			month,
			year
		))
	}

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

	const width = containerRef.current ? 
		(containerRef.current.offsetWidth - containerRef.current.offsetLeft) * 0.7 :
		0

	return (
		<div className='calendar' ref={containerRef}>
			<div className="month-control">
				<UIButton
					className="mb-2 p-2"
					onAction={decrementMonth}
				>
					<FaCaretLeft />
				</UIButton>
				<div>{`${date.getMonthName()}, ${date.getYear()}`}</div>
				<UIButton
					className="mb-2 p-2"
					onAction={incrementMonth}
				>
					<FaCaretRight />
				</UIButton>
			</div>
			<div className="days-of-week">
				{['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((value, key) => {
					return (
						<div
							key={`${value}${key}`}
							className="font-bebas grow"
							style={{ width }}
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
									className={`${date.getDay() === day ? 'active' : ''} ${day < 0 || day > 100 ? 'from-other-month' : ''}`}
									onClick={() => updateDate(weekKey, dayKey)}
									style={{ width }}
								>
									{value}
								</button>
							)
						})}
					</div>
				)
			})}
		</div>
	);
};


export default Calendar;