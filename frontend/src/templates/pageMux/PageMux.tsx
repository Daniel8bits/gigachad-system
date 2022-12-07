import React, {useMemo} from 'react'
import { useParams } from 'react-router-dom';

interface PageMuxConfig {
  default: () => React.FC<JSX.IntrinsicAttributes>,
  [parameters: string]: () => React.FC<JSX.IntrinsicAttributes>
}

function PageMux(config: PageMuxConfig) {

  const PageMuxResult: React.FC<JSX.IntrinsicAttributes> = () => {
    
    function getPage () {

      let muxKey = ''

      const url = new URL(location.href)

      const paramsCount = url.searchParams.toString().split('&').length
      let i = 0
      
      url.searchParams.forEach((value, key, allKeys) => {
        muxKey += paramsCount === i+1 ? `:${key}` : `:${key}, `
        i++
      })

      muxKey = muxKey === '' ? '' : `[${muxKey}]`

      if(muxKey === '') return config.default()

      return config[muxKey] ? config[muxKey]() : config.default()

    }

    const Page = getPage()

    return <Page  />
  }

  return PageMuxResult

}

export default PageMux