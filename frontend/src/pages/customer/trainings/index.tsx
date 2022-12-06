import React, { useEffect, useState } from "react";
import ContentLayout from '@layouts/contentLayout/ContentLayout';
import Button from "@ui/button/UIButton";
import TrainingItem from "@components/trainingItem/TrainingItem";
import LoadingScreen  from "@components/loadingScreen/LoadingScreen";
import axios from '@utils/axios';
import CustomTemplate from "@templates/customTemplate/CustomTemplate";
import Placeholder from "@components/placeholder/Placeholder";
import TrainingsActions from "@components/trainingsActions/TrainingsActions";
import PageMux from "@templates/pageMux/PageMux";

//import type * as ITraining from 'gigachad-shareds/endpoint/Training'

type ITraining = {
  name: string
  creationDate: string
  owner?: string 
  numExercise: number
}[]

const Index = CustomTemplate<ITraining>({
  endpoint: '/training',
  title: 'Meus treinos',
  body: props => {
    return (
      <>
        <TrainingsActions  />
        <br  />
        {props.data.map((item) => 
          (
            <TrainingItem 
              name={item.name} 
              date={item.creationDate} 
              owner={item.owner} 
              numExercise={item.numExercise} 
            />
          )
        )}
        {props.data.length === 0 && (
          <Placeholder message='Você ainda não possui treinos cadastrados'  />
        )}
      </>
    )
  }
})

export default PageMux({
  default: () => Index,
  '[:numExercicio]' : () => props => {
    return <>something</>
  }
})
