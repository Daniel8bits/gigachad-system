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
import TrainingsActions, { TrainingActionsMode } from "@components/trainingsActions/TrainingsActions";
import ExerciseItem from "@components/exerciseItem/ExerciseItem";
import EditableField from "@components/editableField/EditableField";
import { useNavigate } from "react-router-dom";

type IExercises = {
    id: number
    selected: UIComboItemData | null
    repetition: string
    series: string
    weight: string
}

const Create: React.FC<JSX.IntrinsicAttributes> = () => {
    /* Os <br /> São temporários */

    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("Novo Treino");
    const [exercises, setExercises] = useState<UIComboItemData[]>([]);
    const [exerciseItens, setExerciseItens] = useState<IExercises[]>([]);
    const navigate = useNavigate()

    useEffect(() => {
        axios.get("/exercise").then(({ data }) => data).then(({ data }) => {
            setExercises(data.map((item: any) => ({ value: String(item.id), label: item.name })));
            setLoading(false);
        })
    }, []);

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

    const handleRemoveExercise = (key: number) => {
        setExerciseItens((old) => {
          return old.filter((v, i) => i !== key);
        })
      }

    const handleChangeExercise = (value: UIComboItemData | null | ((oldValue: UIComboItemData | null) => UIComboItemData), index: number) => {
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
        axios.post("/training", { name, exercises })
            .then(() => {
                navigate('/trainings')
            })
        console.log(exercises);
    }

    return (
        <ContentLayout title='Criar novo treino'>
            {loading ? <LoadingScreen /> : (
                <>
                    <EditableField value={name} setValue={setName} />
                    <form onSubmit={handleSubmit}>
                        <TrainingsActions mode={TrainingActionsMode.CREATE_EXERCISE} />
                        <br />
                        {exerciseItens.map((item,key) => (
                            <ExerciseItem
                                key={key}
                                exercises={exercises}
                                item={item}
                                handleChangeExercise={handleChangeExercise}
                                onRemove={() => handleRemoveExercise(key)}
                                editMode
                            />
                        ))}
                        <Button onAction={handleAddExercise}>Adicionar Exercício</Button>
                    </form>
                </>
            )}
        </ContentLayout>
    )
}
export default Create;