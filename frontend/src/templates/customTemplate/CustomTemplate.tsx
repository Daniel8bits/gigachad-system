import Actions, { ActionsCallbacks } from '@components/actions/Actions';
import Filter, { FilterData, InputConfig } from '@components/filter/Filter';
import { useMessageBox } from '@components/messageBox/MessageBox';
import ContentLayout from '@layouts/contentLayout/ContentLayout';
import { DialogType } from '@layouts/dialogLayout/DialogLayout';
import Endpoint from '@middlewares/Endpoint';
import Middleware from '@middlewares/Middleware';
import { useSelector } from '@store/Root.store';
import { useModalTemplate } from '@templates/modalTemplate/withModalTemplate';
import TemplateURLActions from '@templates/TemplateURLAction';
import UITable, { RowDataType, UITableDocument } from '@ui/table/UITable';
import getPageName from '@utils/algorithms/getPageName';
import React, { useMemo, useEffect, useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TemplateActions from '../TemplateActions';

interface CustomTemplateBodyProps<T> {
  data: T[]
  handleDelete: (pk: string) => void
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
  filter?: FilterConfig
  body: React.FC<CustomTemplateBodyProps<T>>
}

function CustomTemplate<T>(config: FilterTableTemplateConfig<T>) {

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
        const role = useSelector(state => state.auth.role);
        const [data, setData] = useState<T[]>([])

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
            }
          }
        }, [])

        const clean = useCallback(() => {

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
              /*
              if (!document.getSelectedRow()) {
                updateMessageBox({
                  open: true,
                  params: {
                    message: "Selecione uma linha antes para abrir.",
                    type: DialogType.INFO
                  }
                })
                return
              }*/
              navigate(`${pageName}/${TemplateURLActions.OPEN}`)
            }
          }

          if (actionsSet.has(TemplateActions.EDIT)) {
            actionsCallbacks.onEdit = () => {
              /*if (!document.getSelectedRow()) {
                return
              }*/
              navigate(`${pageName}/${TemplateURLActions.EDIT}`)
            }
          }

          if (actionsSet.has(TemplateActions.NEW)) {
            actionsCallbacks.onNew = () => {
              if(!modal.params) return
              updateModal({
                open: modal.open,
                params: {
                  mode: modal.params.mode,
                  data: modal.params.data,
                  endpoint: config.endpoint
                }
              })
              navigate(`${pageName}/${TemplateURLActions.NEW}`)
            }
          }

          if (actionsSet.has(TemplateActions.DELETE)) {
            actionsCallbacks.onDelete = () => {
              /*if (!document.getSelectedRow()) {
                return
              }*/
              console.log('here delete line')
            }
          }

          return actionsCallbacks

        }, [role])

        const handleDelete = useCallback((pk: string) => {

        }, [])

        return (
          <ContentLayout title={config.title}>
            <Actions actionsCallbacks={actions} />
            {config.filter && <Filter
              inputs={config.filter.layout}
              onSearch={search}
              onClean={clean}
            />}
            <config.body data={data} handleDelete={handleDelete}  />
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
