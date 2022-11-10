import React, { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { FaChevronDown } from 'react-icons/fa'


export type IMenuItem = {
    to: string
    text: string
    submenu?: IMenuItem[]
}


interface MenuItemProps {
    item: IMenuItem
    active: boolean
}



const MenuItem: React.FC<MenuItemProps> = ({ item, active }) => {
    const location = useLocation();
    const [open,setOpen] = useState(() => {
        if(item.submenu){
            return item.submenu.filter((value) => value.to === location.pathname).length > 0;
        }
        return false;
    });

    const handleClick = (e : React.MouseEvent) => {
        if(item.submenu){
            e.preventDefault();
            setOpen((open) => !open);
            return false;
        }
        return true;
    }

    const height = useMemo(() => {
        if(item.submenu) return item.submenu.length * 37;
        return 0;
    },[item]);

    return (
        <li>
            <Link onClick={handleClick} className={!item.submenu && active ? "active" : ""} to={item.to}>
                <span className='name'>{item.text}</span>
                {item.submenu && <span className='dropdown'><FaChevronDown /></span>}
            </Link>
            {item.submenu && (
                <ul className={`submenu${open ? " open" : ""}`} style={{height: open ? height : 0}}>
                    {item.submenu.map((item, key) => (
                        <li key={key}>
                            <Link className={item.to === location.pathname ? "active" : ""} to={item.to}>
                                <span className='name'>{item.text}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </li>
    )
};

export default MenuItem;