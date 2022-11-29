import React, { useEffect, useState } from "react";
import ContentLayout from '@layouts/contentLayout/ContentLayout';
import Button from "@ui/button/UIButton";
import TrainingItem from "@ui/trainingItem/UITrainingItem";
import LoadingScreen  from "@components/loadingScreen/LoadingScreen";
import axios from '@utils/axios';

type ITraining = {
    name: string
    creationDate: string
    owner?: string 
    numExercise: number
}

const Training = () => {
    /* Os <br /> São temporários */

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
            {loading && <LoadingScreen />  || trainings?.map((item) => (<TrainingItem name={item.name} date={item.creationDate} owner={item.owner} numExercise={item.numExercise} />))}
        </ContentLayout>
    )
}
export default Training;