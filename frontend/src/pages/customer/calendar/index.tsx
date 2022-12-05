import React, { useState } from 'react'
import CustomTemplate from "@templates/customTemplate/CustomTemplate";
import { IDateTraining } from "gigachad-shareds/models";
import TrainingsActions from '@components/trainingsActions/TrainingsActions';
import Calendar from '@components/calendar/Calendar';


export default CustomTemplate<IDateTraining>({
  endpoint: '/calendar',
  title: 'Meu calendário',
  body: props => {

    return (
      <> 
        <TrainingsActions calendar  />
        <br  />
        <Calendar  />
      </>
    )
  }
})