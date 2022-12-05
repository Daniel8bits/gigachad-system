import React, { useState } from 'react'
import CustomTemplate from "@templates/customTemplate/CustomTemplate";
import { IDateTraining } from "gigachad-shareds/models";
import TrainingsActions from '@components/trainingsActions/TrainingsActions';
import Calendar from '@components/calendar/Calendar';
import UIDatePicker, { UIDate } from '@ui/datepicker/UIDatePicker';
import Row from '@layouts/grid/Row';
import Column from '@layouts/grid/Column';


export default CustomTemplate<IDateTraining>({
  endpoint: '/calendar',
  title: 'Meu calendário',
  body: props => {

    const [date, setDate] = useState<UIDate>(UIDate.now());

    return (
      <> 
        <TrainingsActions calendar  />
        <br  />
        <Row>
          <Column lg={4} xl={4} xxl={4}>
            <UIDatePicker id='exemplo' label='exemplo' value={date} onAction={setDate}  />
          </Column>
        </Row>
        <br  />
        <Calendar  />
      </>
    )
  }
})