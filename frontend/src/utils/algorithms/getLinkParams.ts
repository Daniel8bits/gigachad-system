

function getLinkParams() {
  const params: Record<string, string> = {}
  if(location.search === '') {
    return null
  }

  location.search.split('&').forEach(param => {
    const [key, value] = param.split('=')
    params[key] = value
  })

  return params
}

export default getLinkParams