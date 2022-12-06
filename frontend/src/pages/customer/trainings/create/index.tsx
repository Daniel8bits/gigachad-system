import React, { useEffect, useState } from "react";
import ContentLayout from '@layouts/contentLayout/ContentLayout';
import Button from "@ui/button/UIButton";
import TrainingItem from "@components/trainingItem/TrainingItem";
import LoadingScreen from "@components/loadingScreen/LoadingScreen";
import UIComboBox, { UIComboItemType, UIComboItemData } from '@ui/combobox/UIComboBox';
import TextField from '@ui/textfield/UITextField';
import Box from '@ui/box/UIBox';
import axios from '@utils/axios';
import CustomTemplate from "@templates/customTemplate/CustomTemplate";

type IExercises = {
    id: number
    selected: UIComboItemData | null
}

const Create = () => {
    /* Os <br /> São temporários */

    const [loading, setLoading] = useState(true);
    const [exercises, setExercises] = useState<UIComboItemType>([]);
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

    const handleChangeExercice = (value: UIComboItemData | null | ((oldValue: UIComboItemData | null) => UIComboItemData), index: number) => {
        setExerciseItens((old) => {
            const _tmp = [...old];
            _tmp[index].selected = value as UIComboItemData;
            return _tmp;
        })
        console.group(value);
    }

    return (
        <ContentLayout title="Novo Treino">
            <br />
            {exerciseItens.map((item, key) => (
                <Box className="ui-training-create">
                    <div className="name">
                        <UIComboBox
                            id="name"
                            items={exercises}
                            onAction={(value) => handleChangeExercice(value, key)}
                            value={item.selected}
                        />
                    </div>
                    <div className="repetition">
                        <span className="label">Repetições</span>
                        <TextField id="repetition" />
                    </div>
                    <div className="series">
                        <span className="label">Séries</span>
                        <TextField id="series" />
                    </div>
                    <div className="weight">
                        <span className="label">Peso</span>
                        <TextField id="weight" />
                    </div>
                    <div className="remove">
                        -
                    </div>
                </Box>
            ))}
            <Button>Adicionar Exercício</Button>
        </ContentLayout>
    )
}
export default Create;