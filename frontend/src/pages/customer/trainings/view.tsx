import React, { FormHTMLAttributes, useEffect, useState } from "react";
import ContentLayout from '@layouts/contentLayout/ContentLayout';
import Button from "@ui/button/UIButton";
import TrainingItem from "@components/trainingItem/TrainingItem";
import LoadingScreen from "@components/loadingScreen/LoadingScreen";
import UIComboBox, { UIComboItemType, UIComboItemData } from '@ui/combobox/UIComboBox';
import TextField from '@ui/textfield/UITextField';
import Box from '@ui/box/UIBox';
import axios from '@utils/axios';
import Form from "@utils/Form";
import ExerciseItem, { IExercises } from "@components/exerciseItem/ExerciseItem";
import TrainingsActions, { TrainingActionsMode } from "@components/trainingsActions/TrainingsActions";
import TrainingTitle from "@components/trainingTitle/TrainingTitle";

const View: React.FC<JSX.IntrinsicAttributes> = () => {
    /* Os <br /> São temporários */

    const [loading, setLoading] = useState(true);
    const [name, setName] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [id, setID] = useState(0);
    const [exercises, setExercises] = useState<UIComboItemData[]>([]);
    const [exerciseItens, setExerciseItens] = useState<IExercises[]>([]);

    useEffect(() => {
        axios.get("/exercise").then(({ data }) => data).then(({ data }) => {
            setExercises(data.map((item: any) => ({ value: String(item.id), label: item.name })));
        })
    }, []);

    useEffect(() => {
        if (exercises.length === 0) return;
        const id = new URL(location.href).searchParams.get("id");
        if (id) {
            setID(Number(id));
            axios.get(`/training/${id}`).then(({ data }) => data).then(({ data }) => {
                const exerciseItens = data.exercises.map((item: any): IExercises => {
                    return {
                        repetition: item.repetition,
                        id: item.idtraining,
                        series: item.series,
                        weight: item.weight,
                        selected: exercises.find((value) => value.value === String(item.idexercise)) ?? exercises[0]

                    }
                });
                setExerciseItens(exerciseItens);
                setName(data.name)
                setLoading(false);
                setDate(new Date(data.creationdate).toLocaleDateString("PT-BR",{day: 'numeric',month: 'numeric',year:'numeric'}))
            });
        }
    }, [exercises]);

    const handleChangeExercise = (value: UIComboItemData, index: number) => {
        setExerciseItens((old) => {
            const _tmp = [...old];
            _tmp[index].selected = value as UIComboItemData;
            return _tmp;
        })
        console.group(value);
    }



    return (
        <ContentLayout title='Lista de exercícios'>
            {id === 0  || loading ? <LoadingScreen /> : (
                <>
                    <TrainingTitle title={name} date={date} />
                    <TrainingsActions mode={TrainingActionsMode.VIEW_EXERCISE} trainingId={id} />
                    <br />
                    {exerciseItens.map((item) => (
                        <ExerciseItem
                            key={item.id}
                            exercises={exercises}
                            item={item}
                            handleChangeExercise={handleChangeExercise}
                        />
                    ))}
                </>
            )}
        </ContentLayout>
    )
}
export default View;