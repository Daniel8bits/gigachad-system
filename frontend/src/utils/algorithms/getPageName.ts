import TemplateURLActions from "@templates/TemplateURLAction";
import { Location } from "react-router-dom";

function getPageName(location: Location) {
  
  const pathname = location.pathname.at(location.pathname.length) === '/' ? 
  location.pathname.substring(0, location.pathname.length-1) :
  location.pathname

  const modalRegex = `^(/[a-zA-Z]+)+/(${TemplateURLActions.OPEN}|${TemplateURLActions.NEW}|${TemplateURLActions.EDIT})$`

  if(pathname.match(new RegExp(modalRegex))) {
    return pathname.substring(0, pathname.lastIndexOf('/'))
  }

  return pathname

}

export default getPageName