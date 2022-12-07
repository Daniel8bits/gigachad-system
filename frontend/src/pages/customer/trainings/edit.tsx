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
import ExerciseItem, { IExercises } from "@components/exerciseItem/ExerciseItem";
import EditableField from "@components/editableField/EditableField";


const Edit: React.FC<JSX.IntrinsicAttributes> = () => {
    /* Os <br /> São temporários */

    const [loading, setLoading] = useState(true);
    const [id, setId] = useState<number>(0);
    const [name, setName] = useState<string>('');
    const [exercises, setExercises] = useState<UIComboItemData[]>([]);
    const [exerciseItens, setExerciseItens] = useState<IExercises[]>([]);

    useEffect(() => {
      axios.get("/exercise").then(({ data }) => data).then(({ data }) => {
        setExercises(data.map((item: any) => ({ value: String(item.id), label: item.name })));
      })
      axios.get("/training/1").then(({ data }) => data).then(({ data }) => {
        setExerciseItens(data.exercises)
        setLoading(false);
      });
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
      console.log(exercises);
    }

    return (
      <ContentLayout title='Editar treino'>
        <EditableField value={name} setValue={setName}  />
        <form onSubmit={handleSubmit}>
          <TrainingsActions trainingId={id} mode={TrainingActionsMode.EDIT_EXERCISE}  />
          <br />
          {exerciseItens.map((item) => (
            <ExerciseItem 
              key={item.id}
              exercises={exercises}
              item={item}
              handleChangeExercise={handleChangeExercise}
              editMode
            />
          ))}
          <Button onAction={handleAddExercise}>Adicionar Exercício</Button>
        </form>
      </ContentLayout>
    )
}
export default Edit;