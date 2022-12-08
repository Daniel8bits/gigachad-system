import React, { useMemo } from 'react';
import {Link} from 'react-router-dom';

type UIBoxProps = {
    className?: string
    to?: string
    onClick?: () => void
}
const UIBox = ({  children, className, to, onClick }: React.PropsWithChildren<UIBoxProps>) => {

    const Element = useMemo(() => {
        if (to) return Link;
        return "div";
    }, [to]);


    return (
        <Element to={to ?? ""} className={`ui-box ${className ?? ""}`} onClick={onClick}>
            {children}
        </Element>
    )
}
export default UIBox;