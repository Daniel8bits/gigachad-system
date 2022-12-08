import React, { useEffect, useState, useCallback } from "react";
import ContentLayout from '@layouts/contentLayout/ContentLayout';
import LoadingScreen from "@components/loadingScreen/LoadingScreen";
import Column from '@layouts/grid/Column';
import Row from '@layouts/grid/Row';
import Card from '@ui/card/UICard'
import axios from '@utils/axios';
import Button from '@ui/button/UIButton';
import { useSelector } from "@store/Root.store";

type IPlans = {
    id: number
    name: string
    description: string
    frequency: 'montly' | 'semmiannual' | 'quarterly' | 'annual'
    value: number
}
const FrequencyPlan = {
    montly: 'mês',
    semmiannual: 'bimestre',
    quarterly: 'semestre',
    annual: 'ano'
}

const Plans = () => {
    const auth = useSelector(state => state.auth);
    /* Os <br /> São temporários */

    const [loading, setLoading] = useState(true);
    const [plans, setPlans] = useState<IPlans[]>([]);

    useEffect(() => {
        axios.get("/plan/availables").then(({ data }) => data).then(({ data }) => {
            setPlans(data);
            setLoading(false);
        })
    }, []);

    const handlePlan = (id: number) => () => {
        axios.post(`/account/plan/${id}`).then(({data}) => {
            console.log(data);
        });
    }

    const num = Math.floor(12 / plans.length);
    return (
        <ContentLayout title="Escolha um Plano">
            {loading && <LoadingScreen /> || (
                <Row>
                    {plans.map((item) => (
                        <Column sm={12} md={num} lg={num} xl={num} xxl={num}>
                            <Card className="ui-plans">
                                <b className="name">{item.name}</b>
                                <div className="price">
                                    <span className="value">R$ {item.value}<span className="cent">,00/</span>
                                        <span className="frequency">{FrequencyPlan[item.frequency] ?? "mês"}</span>
                                    </span>
                                </div>
                                <div className="description">

                                    {item.description}
                                </div>
                                <Button onAction={handlePlan(item.id)} className="fluid" disabled={item.id === auth.account?.Customer.idcurrentplan}>{item.id === auth.account?.Customer.idcurrentplan ? "Atualmente Contratado" : "Contratar"}</Button>
                            </Card>
                        </Column>
                    ))}
                </Row>
            )}
        </ContentLayout>
    )
}
export default Plans;