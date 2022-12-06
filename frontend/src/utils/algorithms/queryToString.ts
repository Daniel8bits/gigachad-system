

function queryToString(query: SerializableMap<string, string>) {

  if(query.length === 0) return ''

  let valuePath = '?'

  query.forEach((value, i) => {
    valuePath += query.length === i+1 ? `${value[0]}=${value[1]}` : `${value[0]}=${value[1]}&`
  })

  return valuePath
}

export default queryToString