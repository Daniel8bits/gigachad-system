

function getLinkParamsKeys() {
  const params: string[] = []
  if(location.search === '') {
    return null
  }

  location.search.split('&').forEach(param => {
    const [key, ] = param.split('=')
    params.push(key)
  })

  return params
}

export default getLinkParamsKeys