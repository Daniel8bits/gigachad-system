import React from 'react';


type UICardProps = {
    className?: string
    image?: string
    title?: string
    onClick?: () => void
}
const UICard = ({ children, className, image, title, onClick }: React.PropsWithChildren<UICardProps>) => {
    return (
        <button type='button' className={`ui-card ${className ?? ""}`} onClick={onClick}>
            {image && <img src={image} alt={title} />}
            <div className='card-content'>
                {title && <h3>{title}</h3>}
                {children}
            </div>
        </button>
    )
}
export default UICard;