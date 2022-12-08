import React, { useEffect, useState, useCallback, useContext } from "react";
import ContentLayout from '@layouts/contentLayout/ContentLayout';
import Filter, { FilterData, InputType } from '@components/filter/Filter';
import LoadingScreen from "@components/loadingScreen/LoadingScreen";
import Column from '@layouts/grid/Column';
import Row from '@layouts/grid/Row';
import Card from '@ui/card/UICard'
import axios from '@utils/axios';
import CustomTemplate, { getCustomTemplateContext } from "@templates/customTemplate/CustomTemplate";
import Placeholder from "@components/placeholder/Placeholder";
//import type * as ITutorial from 'gigachad-shareds/endpoint/T'

type ITutorial = {
  Exercise: {
    id: number
    name: string
  }
  idExercise: number
  video_url: string
  image: { video: string }
  explanation: string
}
/*
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
/*
const Tutorial = () => {
  /* Os <br /> São temporários *

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
      />*}
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
*/

export default CustomTemplate<ITutorial>({
  endpoint: 'tutorial',
  title: 'Tutoriais',
  filter: {
    layout: [
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
          items: [
            { value: 'supino', label: 'Supino' },
            { value: 'esteira', label: 'Esteira' },
            { value: 'alteres', label: 'Alteres' },
            { value: 'barra', label: 'Barra' },
          ],
          size: { sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 }
        },
        {
          id: '3',
          title: 'Músculos',
          type: InputType.COMBOBOX,
          items: [
            { value: 'biceps', label: 'Bíceps' },
            { value: 'triceps', label: 'Tríceps' },
            { value: 'peito', label: 'Peito' },
            { value: 'trapezio', label: 'Trapézio' },
          ],
          size: { sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 }
        }
      ],
    ],
    validate: data => {
      const cpf = data.textfieldValues.get('1')
      const name = data.textfieldValues.get('2')

      //if(!cpf && !name) return false;

      return true
    },
    format: data => {
      const cpf = data.textfieldValues.get('1')
      const name = data.textfieldValues.get('2')

      return {
        cpf,
        name
      }
    }
  },
  body: props => {

    const { actions } = useContext(getCustomTemplateContext<ITutorial>())

    return (
      <>
        {props.data.length > 0 &&
          (<Row>
            {props.data.map((item) => {
              const videoID = new URL(item.video_url).searchParams.get('v') ?? ""
              return (

                <Column sm={6} md={6} lg={3} xl={3} xxl={3}>
                  <Card
                    image={`https://img.youtube.com/vi/${videoID}/mqdefault.jpg`}
                    title={item.Exercise.name}
                    onClick={() => actions.open(item)}
                  >
                    {item.explanation}
                  </Card>
                </Column>
              )
            }
            )}
          </Row>
          )}
        {props.data.length === 0 &&
          <Placeholder message='Parece que não há tutoriais disponíveis' />}
      </>
    )
  },
  displayActions: false
});