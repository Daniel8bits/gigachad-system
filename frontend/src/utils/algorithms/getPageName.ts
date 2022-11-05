import getLinkParamsKeys from "./getLinkParamsKeys";


function getPageName() {
  const keys = getLinkParamsKeys()
  let paramname: string = ''
  if(keys) {
    paramname = '['
    keys?.forEach((key, i) => {
      if(i > 0) {
        paramname += ','
      }
      paramname += key
    })
    paramname += ']'
  }
  return `${location.pathname}/${paramname}`
}

export default getPageName