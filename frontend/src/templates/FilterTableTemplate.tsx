import Filter, { InputConfig } from '@components/filter/Filter';
import useModal from '@hooks/useModal';
import MainLayout from '@layouts/mainLayout/MainLayout';
import Endpoint from '@middlewares/Endpoint';
import Middleware from '@middlewares/Middleware';
import UITable, { RowDataType, UITableDocument } from '@ui/table/UITable';
import React,{useMemo, useEffect} from 'react';
import TemplateActions from './TemplateActions';

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

    const template: React.FC<JSX.IntrinsicAttributes> = (props) => {
      console.log("render");
      //const [modal, updateModal] = useModal('FilterTableTemplate_modal')

      /*============================== 
                  ACTIONS
      ==============================*/

      const actions = {

        open: () => {

        }

      }

      const document = useMemo<UITableDocument<T>>(() => new UITableDocument<T>({
        //data: endpoint.get(),
        columns: config.table.columns,
        description: config.table.description
      }), [])

      useEffect(() => {
        (async() => {
          document.setData(await endpoint.get())
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
        <MainLayout>
          <h1> {config.title} </h1>
          <div>

          </div>
          
          <Filter 
            inputs={config.filter.layout}  
            onSearch={search}
            onClean={clean}
          />
          <UITable document={document}  />
        </MainLayout>
      )
  
    };
  
    template.displayName = `FilterTablePage`;
  
    return template;

  })
}

export default FilterTableTemplate;
