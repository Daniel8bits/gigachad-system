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

type IExercises = {
    id: number
    selected: UIComboItemData | null
    repetition: string
    series: string
    weight: string
}

const View = () => {
    /* Os <br /> São temporários */

    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("Novo Treino");
    const [id,setID] = useState(0);
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
            });
        }
    }, [exercises]);

    const handleAddExercise = () => {
        setExerciseItens((old) => {
            const _tmp = [...old];
            const last = old.slice(-1)[0];
            let id = 0;
            if (last) {
                id = last.id + 1;
            }
            _tmp.push({ selected: exercises[0] as UIComboItemData, id, weight: "0", repetition: "0", series: "0" })
            return _tmp;
        })
    }

    const handleChangeExercice = (value: UIComboItemData | null | ((oldValue: UIComboItemData | null) => UIComboItemData), index: number) => {
        setExerciseItens((old) => {
            const _tmp = [...old];
            _tmp[index].selected = value as UIComboItemData;
            return _tmp;
        })
        console.group(value);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const exercises: any = {};
        const values = Form(e.currentTarget);
        Object.entries(values).forEach(([key, value]) => {
            const [, name, id] = key?.match(/(\w+)\[([0-9]+)\]/) ?? [];
            if (!exercises[name]) exercises[name] = {}
            exercises[name][id] = value;
        })
        axios.put(`/training/${id}`, { name, exercises })
    }

    return (
        <ContentLayout title={name}>
            <form onSubmit={handleSubmit}>
                <Button submit> Salvar </Button>
                <br />
                {exerciseItens.map((item, key) => (
                    <Box className="ui-training-create">
                        <div className="name">
                            <UIComboBox
                                id={`name[${key}]`}
                                name={`name[${key}]`}
                                items={exercises}
                                onAction={(value) => handleChangeExercice(value, key)}
                                value={item.selected}
                            />
                        </div>
                        <div className="repetition">
                            <span className="label">Repetições</span>
                            <TextField id={`repetition[${key}]`} defaultValue={item.repetition} />
                        </div>
                        <div className="series">
                            <span className="label">Séries</span>
                            <TextField id={`series[${key}]`} defaultValue={item.series} />
                        </div>
                        <div className="weight">
                            <span className="label">Peso</span>
                            <TextField id={`weight[${key}]`} defaultValue={item.weight} />
                        </div>
                        <div className="remove">
                            -
                        </div>
                    </Box>
                ))}
                <Button onAction={handleAddExercise}>Adicionar Exercício</Button>
            </form>
        </ContentLayout>
    )
}
export default View;