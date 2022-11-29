import React, { useEffect, useState } from "react";
import ContentLayout from '@layouts/contentLayout/ContentLayout';
import Button from "@ui/button/UIButton";
import TrainingItem from "@ui/trainingItem/UITrainingItem";
import LoadingScreen  from "@components/loadingScreen/LoadingScreen";
import axios from '@utils/axios';

type IExercises = {
    id: number
}

const Create = () => {
    /* Os <br /> São temporários */

    const [loading,setLoading] = useState(true);
    const [exercises,setExercises] = useState<IExercises[]>();

    useEffect(() => {
        axios.get("/exercises").then(({ data }) => data).then(({data}) => {
            setExercises(data);
            setLoading(false);
        })
    },[]);

    return (
        <ContentLayout title="Novo Treino">
            <br />
            <Button>Novo Treino</Button>
        </ContentLayout>
    )
}
export default Create;