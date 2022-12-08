import React, { useEffect, useState } from "react";
import ContentLayout from '@layouts/contentLayout/ContentLayout';
import Button from "@ui/button/UIButton";
import TrainingItem, { ITraining } from "@components/trainingItem/TrainingItem";
import LoadingScreen from "@components/loadingScreen/LoadingScreen";
import axios from '@utils/axios';
import CustomTemplate from "@templates/customTemplate/CustomTemplate";
import Placeholder from "@components/placeholder/Placeholder";
import TrainingsActions from "@components/trainingsActions/TrainingsActions";
import PageMux from "@templates/pageMux/PageMux";
import ViewTraining from './view'
import CreateTraining from './create'
import EditTraining from './edit'

//import type * as ITraining from 'gigachad-shareds/endpoint/Training'

const Index = CustomTemplate<ITraining>({
  endpoint: '/training',
  title: 'Meus treinos',
  body: props => {
    return (
      <>
        <TrainingsActions />
        <br />
        {props.data.map((item) =>
        (
          <TrainingItem
            id={item.id}
            name={item.name}
            date={item.creationDate}
            owner={item.owner}
            numExercise={item.numExercise}
          />
        )
        )}
        {props.data.length === 0 && (
          <Placeholder message='Você ainda não possui treinos cadastrados' />
        )}
      </>
    )
  }
})

export default PageMux({
  default: () => Index,
  '[:id]' : () => ViewTraining,
  '[:create]' : () => CreateTraining,
  '[:edit, :id]': () => EditTraining
})
