import TemplateURLActions from "@templates/TemplateURLAction";
import { Location } from "react-router-dom";


function getModalName(location: Location): [string, TemplateURLActions, string]|[null, TemplateURLActions, null] {

  const pathname = location.pathname.at(location.pathname.length) === '/' ? 
    location.pathname.substring(0, location.pathname.length-1) :
    location.pathname

  const pagename = pathname.substring(0, pathname.lastIndexOf('/'))

  
  if(pagename.match(/^\/(customer|attendant|financier|manager|trainer)\/([a-zA-Z]*)$/g)) {

    const urlAction = pathname.substring(pathname.lastIndexOf('/')+1)

    const modalName = `${pagename}/${pagename.split('/').pop()}.modal`

    switch (urlAction) {
      case TemplateURLActions.OPEN:
        return [modalName, TemplateURLActions.OPEN, pagename]
      case TemplateURLActions.EDIT:
        return [modalName, TemplateURLActions.EDIT, pagename]
      case TemplateURLActions.NEW:
        return [modalName, TemplateURLActions.NEW, pagename]
      default:
        break;
    }

  }

  return [null, TemplateURLActions.CLOSED, null]
}

export default getModalName