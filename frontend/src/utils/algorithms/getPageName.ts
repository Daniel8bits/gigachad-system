import { Location } from "react-router-dom";

function getPageName(location: Location) {
  
  const pathname = location.pathname.at(location.pathname.length) === '/' ? 
  location.pathname.substring(0, location.pathname.length-1) :
  location.pathname

  if(
    pathname.match(/\/new$/g) ||
    pathname.match(/\/open$/g) ||
    pathname.match(/\/edit$/g) 
  ) {
    return pathname.substring(0, pathname.lastIndexOf('/'))
  }

  return pathname

}

export default getPageName