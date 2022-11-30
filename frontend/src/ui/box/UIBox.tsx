import React, { useMemo } from 'react';

type UIBoxProps = {
    className?: string
    to?: string
}
const UIBox = ({ children, className, to }: React.PropsWithChildren<UIBoxProps>) => {

    const Element = useMemo(() => {
        if (to) return "a";
        return "div";
    }, [to]);

    return (
        <Element href={to} className={`ui-box ${className ?? ""}`}>
            {children}
        </Element>
    )
}
export default UIBox;