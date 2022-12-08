import React, { useState } from 'react'
import CustomTemplate from "@templates/customTemplate/CustomTemplate";
import { IDateTraining } from "gigachad-shareds/models";
import TrainingsActions from '@components/trainingsActions/TrainingsActions';
import Calendar from '@components/calendar/Calendar';
import ContentLayout from '@layouts/contentLayout/ContentLayout';
import PageMux from '@templates/pageMux/PageMux';
import View from './view'
import Add from './add'

const Index: React.FC<JSX.IntrinsicAttributes> = () => {
  return (
    <ContentLayout title='Calendário de treinos'>
      <TrainingsActions calendar  />
      <br  />
      <Calendar  />
    </ContentLayout> 
  )
}

export default PageMux({
  default: () => Index,
  '[:id, :day, :month, :year]' : () => View,
  '[:day, :month, :year]' : () => Add
})