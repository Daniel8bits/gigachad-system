import React from 'react';


type UICardProps = {
    className?: string
    image?: string
    title?: string
}
const UICard = ({ children, className, image, title }: React.PropsWithChildren<UICardProps>) => {
    return (
        <a href='/' className={`ui-card ${className ?? ""}`}>
            {image && <img src={image} alt={title} />}
            <div className='card-content'>
                {title && <div className='title'>{title}</div>}
                {children}
            </div>
        </a>
    )
}
export default UICard;