import Actions, { ActionsCallbacks } from '@components/actions/Actions';
import Filter, { FilterData, InputConfig } from '@components/filter/Filter';
import { useMessageBox } from '@components/messageBox/MessageBox';
import ContentLayout from '@layouts/contentLayout/ContentLayout';
import { DialogType } from '@layouts/dialogLayout/DialogLayout';
import Endpoint from '@middlewares/Endpoint';
import Middleware from '@middlewares/Middleware';
import { useSelector } from '@store/Root.store';
import TemplateURLActions from '@templates/TemplateURLAction';
import UITable, { RowDataType, UITableDocument } from '@ui/table/UITable';
import getPageName from '@utils/algorithms/getPageName';
import React, { useMemo, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TemplateActions from '../TemplateActions';
import FilterTableTemplateModal, { useModalTemplate } from '../modalTemplate/withModalTemplate';



interface FilterConfig {
  layout: InputConfig[][]
  validate?: (data: FilterData) => boolean
  format: (data: FilterData) => Record<string, string|undefined>|null
}

interface TableConfig<T> {
  columns: string[]
  description: (data: T) => RowDataType
  paging?: boolean
}

interface FilterTableTemplateConfig<T> {
  endpoint: string
  title: string
  actions?: TemplateActions[]
  filter: FilterConfig
  table: TableConfig<T>
  preloaded?: boolean
}
 
function FilterTableTemplate<T>(config: FilterTableTemplateConfig<T>) {

  config.preloaded ??= true
/*
  const enableModal = config.actions && config.actions.filter(action => {
    return (
      action === TemplateActions.OPEN ||
      action === TemplateActions.NEW ||
      action === TemplateActions.EDIT
    )
  })
*/
  return Middleware(config.endpoint, config.preloaded, (endpoint: Endpoint<T>) => {
    const template = () => {

      const template: React.FC<JSX.IntrinsicAttributes> = (props) => {

        //const [modal, updateModal] = useModal<ModalTemplateParamType<any>>(config.endpoint)
        const [modal, updateModal] = useModalTemplate<T>()
        const [messageBox, updateMessageBox] = useMessageBox()
        const navigate = useNavigate()
        const location = useLocation()

        /*============================== 
                    TABLE
        ==============================*/



        const document = useMemo<UITableDocument<T>>(() => new UITableDocument<T>({
          //data: endpoint.get(),
          columns: config.table.columns,
          description: config.table.description,
          onRowDoubleClicked: data => {
            actions.onOpen?.()
          }
        }), [])

        useEffect(() => {
          (async () => {
            document.setData(await endpoint.get())
            document.on("page", async (page) => {
              console.log("Event page",page);
              document.setData(await endpoint.get({ page, ...document.getParams() }))
            });
            document.on("params", async (params) => {
              console.log("Event Params",params);
              try{

                document.setData(await endpoint.get({ page: 1,...params }))
              }catch(err){
                console.log(err)
                // tratar erro de permiss??o
                // tratar demais erros
              }
            });
          })();
        }, [])

        /*============================== 
                    FILTRO
        ==============================*/

        const search = useCallback((data: FilterData) => {
          if (!config.filter.validate?.(data)) {
            return
          }
          //document.setPageNumber(1);
          const params = config.filter.format(data)
          if(params) {
            document.setParams(params);
          }
        }, [])

        const clean = useCallback(() => {
          endpoint.get()
            .then(document.setData)
            .catch(console.log)
        }, [])

        /*============================== 
                    ACTIONS
        ==============================*/

        const actions = useMemo<ActionsCallbacks>(() => {

          const actionsSet = new Set<TemplateActions>(config.actions)

          const actionsCallbacks: ActionsCallbacks = {}
          const pageName = getPageName(location)

          if (actionsSet.has(TemplateActions.OPEN)) {
            actionsCallbacks.onOpen = () => {
              const selectedRow = document.getSelectedRow()
              if (!selectedRow) {
                updateMessageBox({
                  open: true,
                  params: {
                    message: "Selecione uma linha antes para abrir.",
                    type: DialogType.INFO
                  }
                })
                return
              }
              if(!modal.params) return
              updateModal({
                open: modal.open,
                params: {
                  ...modal.params,
                  data: selectedRow.data,
                  endpoint: config.endpoint
                }
              })
              navigate(`${pageName}/${TemplateURLActions.OPEN}`)
            }
          }

          if (actionsSet.has(TemplateActions.EDIT)) {
            actionsCallbacks.onEdit = () => {
              const selectedRow = document.getSelectedRow()
              if (!selectedRow) {
                updateMessageBox({
                  open: true,
                  params: {
                    message: "Selecione uma linha antes para abrir.",
                    type: DialogType.INFO
                  }
                })
                return
              }
              if(!modal.params) return
              updateModal({
                open: modal.open,
                params: {
                  ...modal.params,
                  data: selectedRow.data,
                  endpoint: config.endpoint
                }
              })
              navigate(`${pageName}/${TemplateURLActions.EDIT}`)
            }
          }

          if (actionsSet.has(TemplateActions.NEW)) {
            actionsCallbacks.onNew = () => {
              if(!modal.params) return
              updateModal({
                open: modal.open,
                params: {
                  ...modal.params,
                  endpoint: config.endpoint
                }
              })
              navigate(`${pageName}/${TemplateURLActions.NEW}`)
            }
          }

          if (actionsSet.has(TemplateActions.DELETE)) {
            actionsCallbacks.onDelete = () => {
              const selectedRow = document.getSelectedRow()
              if (!selectedRow) {
                updateMessageBox({
                  open: true,
                  params: {
                    message: "Selecione uma linha antes para abrir.",
                    type: DialogType.INFO
                  }
                })
                return
              }
              endpoint.delete(selectedRow.id)
                .catch(console.log)
            }
          }

          return actionsCallbacks

        }, [])

        return (
          <ContentLayout title={config.title}>
            <Actions actionsCallbacks={actions} />
            <Filter
              inputs={config.filter.layout}
              onSearch={search}
              onClean={clean}
            />
            <UITable document={document} />
          </ContentLayout>
        )

      };

      template.displayName = `FilterTablePage`;

      return template;

    }

    return template()
  })
}

export default FilterTableTemplate;
