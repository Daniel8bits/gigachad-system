import React, { useCallback, useEffect, useRef } from 'react';

import { useDispatch, useSelector } from '@store/Root.store';
import { ModalActions } from '@store/components/ModalStore'
import onClickOutside, { OnClickOutsideCallbackRefObject } from '@utils/algorithms/onClickOutside';


interface UIModalProps<T> {
    readonly id?: string
    open?: boolean;
    template?: string
    className?: string
    children?: any
    params?: T
    disableClickOutside?: boolean
}

function UIModal<T>(props: UIModalProps<T>) {

  const dispatch = useDispatch()
  const modals = useSelector(state => state.modal.modal)
  const open = ((): boolean => {
    if(props.id) {
      return (modals[props.id] ? modals[props.id].open : false) as boolean
    }
    return props.open ?? false
  })()

  const ref = useRef<HTMLDivElement>(null);
  const event = useRef<(e: MouseEvent) => void>(null);

  useEffect(() => {
    if(props.id) {

      dispatch(ModalActions.create({
        key: props.id, 
        value: {
          open: props.open ?? false,
          params: props.params
        }
      }))

      return () => {
        dispatch(ModalActions.destroy(props.id))
      }
    }

    return undefined

  }, []);

  const handleClose = useCallback(() => {
    dispatch(ModalActions.update({
      key: props.id, 
      value: {
        open: false
      }
    }))
  }, []);

  useEffect(() => {
    if(props.id && open && ref.current && !props.disableClickOutside) {

      const e = event as OnClickOutsideCallbackRefObject

      if(event.current) {
        document.removeEventListener('click', event.current)
        e.current = null
      }

      e.current = onClickOutside(ref.current, handleClose)
    }
  }, [props.id, open, props.disableClickOutside]);

    return (
      <div className={`ui-modal ${props.template ?? ''} ${open ? 'open' : ''} ${props.className ?? ''}`}>
          <div ref={ref}>
              {props.children}
          </div>
      </div>
    );
}

export default UIModal;