import React from 'react';

type UICardProps = {
    className?: string
}
const UICard = ({ children, className }: React.PropsWithChildren<UICardProps>) => {
    return (
        <a href='/' className={`ui-card ${className}`}>
            {children}
        </a>
    )
}
export default UICard;