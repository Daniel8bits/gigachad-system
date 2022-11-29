import React, { useEffect, useState } from "react";
import ContentLayout from '@layouts/contentLayout/ContentLayout';
import Button from "@ui/button/UIButton";
import TrainingItem from "@ui/trainingItem/UITrainingItem";
import LoadingScreen  from "@components/loadingScreen/LoadingScreen";
import axios from '@utils/axios';
import {ITraining} from 'gigachad-shareds/models';

const Create = () => {
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
        <ContentLayout title="Novo Treino">
            <br />
            <Button>Novo Treino</Button>
        </ContentLayout>
    )
}
export default Create;