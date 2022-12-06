import React, {useMemo} from 'react'
import { useParams } from 'react-router-dom';

interface PageMuxConfig {
  default: () => React.FC<JSX.IntrinsicAttributes>,
  [parameters: string]: () => React.FC<JSX.IntrinsicAttributes>
}

function PageMux(config: PageMuxConfig) {

  const PageMuxResult: React.FC<JSX.IntrinsicAttributes> = () => {

    const params = useParams()

    const Page = useMemo(() => {

      let muxKey = ''

      Object.keys(params).forEach((key, i, allKeys) => {
        muxKey += allKeys.length === i+1 ? `:${key}` : `:${key}, `
      })

      muxKey = muxKey === '' ? '' : `[${muxKey}]`

      if(muxKey === '') return config.default()

      return config[muxKey] ? config[muxKey]() : config.default()

    }, [params]);

    return <Page  />
  }

  return PageMuxResult

}

export default PageMux