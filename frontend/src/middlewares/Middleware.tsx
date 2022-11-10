import React, { useMemo } from "react"
import Endpoint from "./Endpoint"

function Middleware<T>(endpoint: string, preloaded: boolean, template: (endpoint: Endpoint<T>) => React.FC<JSX.IntrinsicAttributes>) {
  const endpointRequester = new Endpoint<T>(endpoint, preloaded)
  //console.log('middleware')
  const Page: React.FC<JSX.IntrinsicAttributes> = (props) => {
    const Template = useMemo(() => template(endpointRequester), []);

    return  <Template {...props} />
  }

  return Page
}

export default Middleware