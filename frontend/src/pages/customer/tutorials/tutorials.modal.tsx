import React, { useMemo } from 'react'
import ModalTemplate from "@templates/modalTemplate/ModalTemplate"
import { ITutorial } from "gigachad-shareds/models"
import Row from '@layouts/grid/Row'
import Column from '@layouts/grid/Column'
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import LoadingScreen from '@components/loadingScreen/LoadingScreen'
import TutorialExplaining from '@components/tutorialExplaining/TutorialExplaining'


export default ModalTemplate<ITutorial>({
  title: 'Visualizar tutorial',
  actions: [],
  body: props => {

    const videoId = useMemo(() => {
      if(!props.data) return null
      return new URL(props.data.video_url).searchParams.get('v')
    }, [props.data?.video_url]);

    return (
      <>
        {props.data && 
        <>
          <Row>
            <Column>
              <div style={{padding: '0 5rem', backgroundColor: 'black'}}>
                {videoId && 
                  <LiteYouTubeEmbed
                    id={videoId}
                    title='Tutorial'
                  />
                }
              </div>
            </Column>
          </Row>
          <Row>
            <Column lg={6} xl={6} xxl={6}>
              <TutorialExplaining explanation={props.data.explanation}  />
            </Column>
            <Column lg={6} xl={6} xxl={6}>
              <img src={props.data.image.url} alt='imagem do exercicio' />
            </Column>
          </Row>
        </>
        }
        {!props.data && <LoadingScreen  />}
      </>
    )
  }
})