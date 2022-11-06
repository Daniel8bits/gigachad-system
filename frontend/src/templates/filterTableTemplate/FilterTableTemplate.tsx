import Actions, { ActionsCallbacks } from '@components/actions/Actions';
import Filter, { InputConfig } from '@components/filter/Filter';
import useModal from '@hooks/useModal';
import ContentLayout from '@layouts/contentLayout/ContentLayout';
import Endpoint from '@middlewares/Endpoint';
import Middleware from '@middlewares/Middleware';
import { ModalTemplateParamType } from '@templates/ModalTemplate';
import TemplateURLActions from '@templates/TemplateURLAction';
import UITable, { RowDataType, UITableDocument } from '@ui/table/UITable';
import getModalName from '@utils/algorithms/getModalName';
import getPageName from '@utils/algorithms/getPageName';
import React,{useMemo, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TemplateActions from '../TemplateActions';
import FilterTableTemplateModal from './FilterTableTemplateModal';
 


interface FilterConfig {
  layout: InputConfig[][]
}

interface TableConfig<T> {
  columns: string[]
  description: (data: T) => RowDataType
  paging?: boolean
}

interface FilterTableTemplateConfig<T> {
  endpoint: string
  title: string
  actions: TemplateActions[]
  filter: FilterConfig
  table: TableConfig<T>
  preloaded?: boolean
}

function FilterTableTemplate<T>(config: FilterTableTemplateConfig<T>) {
  config.preloaded ??= true
  
  return Middleware(config.endpoint, config.preloaded, (endpoint: Endpoint<T>) => {
    return FilterTableTemplateModal(config.endpoint, () => {

      const template: React.FC<JSX.IntrinsicAttributes> = (props) => {
        
        //const [modal, updateModal] = useModal<ModalTemplateParamType<any>>(config.endpoint)
        const navigate = useNavigate()
        const location = useLocation()
  
        /*============================== 
                    ACTIONS
        ==============================*/
  
        const actions = useMemo<ActionsCallbacks>(() => {

          const actionsSet = new Set<TemplateActions>(config.actions)

          const actionsCallbacks: ActionsCallbacks = {}
          const pageName = getPageName(location)
  
          if(actionsSet.has(TemplateActions.OPEN)) {
            actionsCallbacks.onOpen = () => {
              navigate(`${pageName}/${TemplateURLActions.OPEN}`)
            }
          }

          if(actionsSet.has(TemplateActions.EDIT)) {
            actionsCallbacks.onEdit = () => {
              navigate(`${pageName}/${TemplateURLActions.EDIT}`)
            }
          }

          if(actionsSet.has(TemplateActions.NEW)) {
            actionsCallbacks.onNew = () => {
              navigate(`${pageName}/${TemplateURLActions.NEW}`)
            }
          }

          if(actionsSet.has(TemplateActions.DELETE)) {
            actionsCallbacks.onDelete = () => {
              console.log('here delete line')
            }
          }

          return actionsCallbacks
  
        }, [])

        /*============================== 
                    TABLE
        ==============================*/
  
        const document = useMemo<UITableDocument<T>>(() => new UITableDocument<T>({
          //data: endpoint.get(),
          columns: config.table.columns,
          description: config.table.description
        }), [])
  
        useEffect(() => {
          (async() => {
            document.setData(await endpoint.get())
            document.on("page",async(page) => {
              document.setData(await endpoint.get({page}))
            });
          })();
        },[])
    
        /*============================== 
                    FILTRO
        ==============================*/
      
        function search() {
       
        }
      
        function clean() {
      
        }
  
        return (
          <ContentLayout title={config.title}>
            <Actions actionsCallbacks={actions}   />
            <Filter 
              inputs={config.filter.layout}  
              onSearch={search}
              onClean={clean}
            />
            <UITable document={document}  />
          </ContentLayout>
        )
    
      };
    
      template.displayName = `FilterTablePage`;
    
      return template;

    })
  })
}

export default FilterTableTemplate;
