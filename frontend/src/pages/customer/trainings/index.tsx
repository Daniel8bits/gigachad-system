import React, { useEffect, useState } from "react";
import ContentLayout from '@layouts/contentLayout/ContentLayout';
import Button from "@ui/button/UIButton";
import TrainingItem from "@components/trainingItem/TrainingItem";
import LoadingScreen from "@components/loadingScreen/LoadingScreen";
import axios from '@utils/axios';
import CustomTemplate from "@templates/customTemplate/CustomTemplate";
import Placeholder from "@components/placeholder/Placeholder";
import TrainingsActions from "@components/trainingsActions/TrainingsActions";

type ITraining = {
  id: number
  name: string
  creationDate: string
  owner?: string
  numExercise: number
}

export default CustomTemplate<ITraining>({
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
/*
const Training = () => {
    /* Os <br /> São temporários 

    const [loading,setLoading] = useState(true);
    const [trainings,setTrainings] = useState<ITraining[]>();

    useEffect(() => {
        axios.get("/training").then(({ data }) => data).then(({data}) => {
            console.log(data)
            setTrainings(data);
            setLoading(false);
        })
    },[]);

    return (
        <ContentLayout title="Meus Treinos">
            <br />
            <Button>Novo Treino</Button>
            <br />
            <br />
            {loading && <LoadingScreen />  || }
        </ContentLayout>
    )
}
//export default Training;*/