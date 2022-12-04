import Actions, { ActionsCallbacks } from '@components/actions/Actions';
import Filter, { FilterData, InputConfig } from '@components/filter/Filter';
import { useMessageBox } from '@components/messageBox/MessageBox';
import ContentLayout from '@layouts/contentLayout/ContentLayout';
import { DialogType } from '@layouts/dialogLayout/DialogLayout';
import Endpoint from '@middlewares/Endpoint';
import Middleware from '@middlewares/Middleware';
import { useModalTemplate } from '@templates/modalTemplate/withModalTemplate';
import TemplateURLActions from '@templates/TemplateURLAction';
import getPageName from '@utils/algorithms/getPageName';
import React, { useMemo, useEffect, useCallback, useState, createContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TemplateActions from '../TemplateActions';

interface ICustomTemplateContext<T> {
  actions: {
    open: (data: T|undefined) => void,
    edit: (data: T|undefined) => void,
    new: () => void,
    delete: (pk: string|undefined) => void,
  },
  setSelectedData: StateSetter<T|undefined>,
  setPk: StateSetter<string|undefined>
}

const CustomTemplateContext = createContext<ICustomTemplateContext<unknown>|null>(null);

export function getCustomTemplateContext<T>() {
  return CustomTemplateContext as React.Context<ICustomTemplateContext<T>>
}

interface CustomTemplateBodyProps<T> {
  data: T[]
}

interface FilterConfig {
  layout: InputConfig[][]
  validate?: (data: FilterData) => boolean
  format: (data: FilterData) => Record<string, string|undefined>|null
}

interface FilterTableTemplateConfig<T> {
  endpoint: string
  title: string
  preloaded?: boolean
  actions?: TemplateActions[]
  displayActions?: boolean
  filter?: FilterConfig
  body: React.FC<CustomTemplateBodyProps<T>>
}

function CustomTemplate<T>(config: FilterTableTemplateConfig<T>) {

  config.preloaded ??= true
  config.displayActions ??= true
  
  return Middleware(config.endpoint, config.preloaded, (endpoint: Endpoint<T>) => {
    const template = () => {

      const template: React.FC<JSX.IntrinsicAttributes> = (props) => {

        const [modal, updateModal] = useModalTemplate<T>()
        const [messageBox, updateMessageBox] = useMessageBox()
        const navigate = useNavigate()
        const location = useLocation()
        const [data, setData] = useState<T[]>([])
        const [selectedData, setSelectedData] = useState<T>()
        const [pk, setPk] = useState<string>();

        useEffect(() => {
          endpoint.get()
            .then(setData)
            .catch(console.log)
        }, []);

        /*============================== 
                    FILTRO
        ==============================*/

        const search = useCallback((data: FilterData) => {
          if(config.filter) {
            if (!config.filter.validate?.(data)) {
              return
            }
            const params = config.filter.format(data)
            if(params) {
             // document.setParams(params);
             endpoint.get({ page: 1,...params })
              .then(setData)
              .catch(console.log)
            }
          }
        }, [])

        const clean = useCallback(() => {
          endpoint.get()
          .then(setData)
          .catch(console.log)
        }, [])

        /*============================== 
                    ACTIONS
        ==============================*/

        const contextActions = useMemo(() => {

          const pageName = getPageName(location)

          return {
            open: (data: T|undefined) => {

              if (!data) {
                updateMessageBox({
                  open: true,
                  params: {
                    message: "Selecione antes para abrir.",
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
                  data,
                  endpoint: config.endpoint
                }
              })

              navigate(`${pageName}/${TemplateURLActions.OPEN}`)

            },
            edit: (data: T|undefined) => {

              if (!data) {
                updateMessageBox({
                  open: true,
                  params: {
                    message: "Selecione antes para abrir.",
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
                  data,
                  endpoint: config.endpoint
                }
              })

              navigate(`${pageName}/${TemplateURLActions.EDIT}`)

            },
            new: () => {

              if(!modal.params) return
              updateModal({
                open: modal.open,
                params: {
                  ...modal.params,
                  endpoint: config.endpoint
                }
              })
              navigate(`${pageName}/${TemplateURLActions.NEW}`)

            },
            delete: (pk: string|undefined) => {
              if (!pk) {
                updateMessageBox({
                  open: true,
                  params: {
                    message: "Selecione antes para excluir.",
                    type: DialogType.INFO
                  }
                })
                return
              }
              endpoint.delete(pk)
                .catch(console.log)
            }
          }

        }, [])

        const actions = useMemo<ActionsCallbacks>(() => {

          const actionsSet = new Set<TemplateActions>(config.actions)

          const actionsCallbacks: ActionsCallbacks = {}
          

          if (actionsSet.has(TemplateActions.OPEN)) {
            actionsCallbacks.onOpen = () => {
              contextActions.open(selectedData)
            }
          }

          if (actionsSet.has(TemplateActions.EDIT)) {
            actionsCallbacks.onEdit = () => {
              contextActions.edit(selectedData)
            }
          }

          if (actionsSet.has(TemplateActions.NEW)) {
            actionsCallbacks.onNew = () => {
              contextActions.new()
            }
          }

          if (actionsSet.has(TemplateActions.DELETE)) {
            actionsCallbacks.onDelete = () => {
              contextActions.delete(pk)
            }
          }

          return actionsCallbacks

        }, [selectedData, pk, contextActions])

        const context = useMemo<ICustomTemplateContext<T>>(() => ({
          actions: contextActions,
          setSelectedData,
          setPk
        }), [contextActions])

        const CustomTemplateContext = getCustomTemplateContext<T>()

        return (
          <ContentLayout title={config.title}>
            {config.displayActions && <Actions actionsCallbacks={actions} />}
            {config.filter && <Filter
              inputs={config.filter.layout}
              onSearch={search}
              onClean={clean}
            />}
            <CustomTemplateContext.Provider value={context}>
              <config.body data={data}  />
            </CustomTemplateContext.Provider>
          </ContentLayout>
        )

      };

      template.displayName = `FilterTablePage`;

      return template;

    }

    return template()
  })
}

export default CustomTemplate;
