import React, { useCallback, useEffect, useMemo, useRef } from 'react';

import { useDispatch, useSelector } from '@store/Root.store';
import { PopOverActions } from '@store/components/PopOverStore'
import onClickOutside, { OnClickOutsideCallback, OnClickOutsideCallbackRefObject } from '@utils/algorithms/onClickOutside';
import UIScroll from '@ui/scroll/UIScroll';

interface UIPopOverProps {
    readonly id?: string
    readonly width: number | 'inherit' | 'anchor'
    readonly height: number
    anchor: React.MutableRefObject<HTMLElement>
    open?: boolean;
    position?: 'top' | 'bottom' | 'left' | 'right'
    template?: string
    className?: string
    children?: any
}

const UIPopOver: React.FC<UIPopOverProps> = (props) => {

    const dispatch = useDispatch()
    const popOver = useSelector(state => state.popOver.popOver)
    const open = useMemo<boolean>((): boolean => {
      if(props.id) {
        return (popOver[props.id] ? popOver[props.id].open : false) as boolean
      }
      return props.open ?? false
    }, [props.id, props.open, popOver])

    const ref = useRef<HTMLDivElement>(null);
    const event = useRef<OnClickOutsideCallback>(null);

    useEffect(() => {
      if(props.id) {
        dispatch(PopOverActions.create({
          key: props.id, 
          value: {
            open: props.open ?? false
          }
        }))
        return () => {
          dispatch(PopOverActions.destroy(props.id))
        }
      }
      return undefined
    }, []);

    const handleClose = useCallback(() => {
      dispatch(PopOverActions.update({
        key: props.id, 
        value: {
          open: false
        }
      }))
    }, []);

    useEffect(() => {
        if(props.id && open && ref.current) {

          const e = event as OnClickOutsideCallbackRefObject

          if(event.current) {
              document.removeEventListener('click', event.current, true)
              e.current = null
          }

          e.current = onClickOutside(ref.current, handleClose)
        }
    }, [open]);

    const getWidth = useCallback((): number => {
        if(typeof props.width === 'string') {
            switch (props.width) {
                case 'inherit':
                    return ref.current && ref.current.parentElement ? ref.current.parentElement.offsetWidth : 0
                case 'anchor':
                    return props.anchor.current ? 
                    props.anchor.current.offsetWidth : 0
                default:
                    break;
            }
        }
        return props.width as number        
    }, [])

    const getX = useCallback((): number => {
        if(!props.anchor.current) {
            return 0;
        }
        const gap = 32
        const anchorX1 = props.anchor.current.offsetLeft
        const anchorX2 = anchorX1 + props.anchor.current.offsetWidth
        const popWidth = getWidth()
        if(props.position) {
            switch(props.position) {
                case 'top':
                case 'bottom':
                    return anchorX1
                case 'left':
                    return anchorX1 - popWidth - gap/2
                case 'right':
                    return anchorX2 + gap/2
                default:
                    break;
            }
        }
        else if(anchorX2+gap+popWidth < window.innerWidth) {
            return anchorX2 + gap/2
        }
        return anchorX1 - gap/2 - popWidth
    }, [props.anchor])

    const getY = useCallback((): number => {
        if(!props.anchor.current) {
            return 0;
        }
        const gap = 8
        const anchorY1 = props.anchor.current.offsetTop
        const anchorY2 = anchorY1 + props.anchor.current.offsetHeight
        const popHeight = props.height
        if(props.position) {
            switch(props.position) {
                case 'top':
                    return anchorY1 - popHeight - gap
                case 'bottom':
                    return anchorY2 + gap
                default:
                    break;
            }
        }
        if(anchorY2+popHeight < window.innerHeight) {
            return anchorY1
        }
        return anchorY2 - popHeight
    }, [props.anchor])

    return (
        <div 
          ref={ref}
          style={{
              top: `${getY()}px`,
              left: `${getX()}px`,
              width: `${getWidth()}px`,
              height: `${props.height}px`,
          }}
          className={`ui-popover ${props.template ?? ''} ${open && 'open'} ${props.className ?? ''}`}
        >
           <UIScroll maxHeight={props.height-16}>
                {props.children}
           </UIScroll>
        </div>
    );
};

export default UIPopOver;