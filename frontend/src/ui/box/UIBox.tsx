import React from 'react';

type UIBoxProps = {
    className?: string
}
const UIBox = ({ children, className }: React.PropsWithChildren<UIBoxProps>) => {
    return (
        <a href='/' className={`ui-box ${className}`}>
            {children}
        </a>
    )
}
export default UIBox;