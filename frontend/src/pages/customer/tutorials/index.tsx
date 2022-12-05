import React, { useEffect, useState, useCallback } from "react";
import ContentLayout from '@layouts/contentLayout/ContentLayout';
import Filter, { FilterData, InputType } from '@components/filter/Filter';
import LoadingScreen from "@components/loadingScreen/LoadingScreen";
import Column from '@layouts/grid/Column';
import Row from '@layouts/grid/Row';
import Card from '@ui/card/UICard'
import axios from '@utils/axios';

type ITutorial = {
    Exercise:{
        id: number
        name: string
    }
    idExercise: number
    video_url: string
    image: { video: string }
    explanation: string
}

const inputs = [
    [
        {
            id: '1',
            title: 'Nome',
            type: InputType.TEXTFIELD,
            size: { sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 }
        },
        {
            id: '2',
            title: 'Equipamento',
            type: InputType.COMBOBOX,
            items: [],
            size: { sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 }
        }
    ]
]

const Tutorial = () => {
    /* Os <br /> São temporários */

    const [loading, setLoading] = useState(true);
    const [tutoriais, setTutoriais] = useState<ITutorial[]>();

    const search = useCallback((data: FilterData) => {

    }, [])

    const clean = useCallback(() => {

    }, [])

    useEffect(() => {
        axios.get("/tutorial").then(({ data }) => data).then(({ data }) => {
            setTutoriais(data);
            setLoading(false);
        })
    }, []);

    return (
        <ContentLayout title="Tutoriais">
            {/*
            Se quiserem fazer, tem que aplicar no backend tbm
            <Filter
                inputs={inputs}
                onSearch={search}
                onClean={clean}
    />*/}
            {loading && <LoadingScreen /> || (
                <Row>
                    {tutoriais?.map((item) => (

                        <Column sm={6} md={2} lg={2} xl={2} xxl={2}>
                            <Card image={item.image.video} title={item.Exercise.name}>
                                {item.explanation}
                            </Card>
                        </Column>
                    ))}
                </Row>
            )}
        </ContentLayout>
    )
}
export default Tutorial;