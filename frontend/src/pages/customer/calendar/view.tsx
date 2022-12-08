import ContentLayout from '@layouts/contentLayout/ContentLayout'
import Endpoint from '@middlewares/Endpoint';
import React, { useEffect, useState, useRef } from 'react'
import type * as ICalendar from 'gigachad-shareds/endpoint/Calendar'
import DateTrainingTable from '@components/dateTrainingTable/DateTrainingTable';
import CalendarActions, { CalendarActionsMode } from '@components/calendarActions/CalendarActions';
import axios from '@utils/axios'

const View: React.FC<JSX.IntrinsicAttributes> = () => {

  const [params, setParams] = useState<string[]>([]);

  const [dateTraining, setDateTraining] = useState<ICalendar.ICalendar | null>(null);
  const doneItemsRef = useRef<Map<number, boolean>>(new Map<number, boolean>());

  useEffect(() => {
    const params = new URL(location.href).searchParams
    const id = params.get('id')
    const day = params.get('day')
    const month = params.get('month')
    const year = params.get('year')
    if (!id || !day || !month || !year) return
    setParams([id, day, month, year])
    new Endpoint<ICalendar.ICalendar>('/calendar', false)
      .get({ id, day, month, year })
      .then(data => {
        console.log(data)
        setDateTraining(data[0])
      })
      .catch(console.log)
  }, []);

  const handleSave = () => {
    const id = params[0]
    const day = params[1]
    const month = params[2]
    const year = params[3]
    if (!id || !day || !month || !year) return
    axios.put(`/calendar/${id}`, {exercises: Object.fromEntries(doneItemsRef.current)}, {
      params: {
        day, month, year
      }
    })
    console.log(Object.fromEntries(doneItemsRef.current))
  }

  return (
    <ContentLayout title='Treino do dia'>
      <CalendarActions
        mode={CalendarActionsMode.VIEW_TRAINING}
        dateTraining={{
          id: params[0],
          day: params[1],
          month: params[2],
          year: params[3]
        }}
        onSave={handleSave}
      />
      <br />
      <DateTrainingTable training={dateTraining} doneItemsRef={doneItemsRef} />
    </ContentLayout>
  )
}

export default View