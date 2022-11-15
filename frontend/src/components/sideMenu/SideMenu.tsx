import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa'
import MenuItem, {IMenuItem} from '../menuItem/MenuItem';

export enum UserType {
  //user = 0,
  customer = 2,
  //employee = 4,
  attendant = 8,
  manager = 16,
  financer = 32,
  trainer = 64
}

const menuConfig: Record<number, IMenuItem[]> = {
  [UserType.manager]: [
    {
      to: "/customers",
      text: "Clientes"
    },
    {
      to: "/plans",
      text: "Planos",
    },
    {
      to: "/employee",
      text: "Funcionários"
    },
    {
      to: "/equipments",
      text: "Equipamentos"
    },
    {
      to: "/expenses",
      text: "Gastos",
      submenu: [
        {
          to: "/expenses",
          text: "Gastos"
        }
      ]
    }
  ]
}


interface SideMenuProps {
  open: boolean
}



const SideMenu: React.FC<SideMenuProps> = (props) => {
  const location = useLocation();
  const selected = location.pathname;
  const menu = useMemo(() => menuConfig[UserType.manager], []);
  
  return (
    <div className={`side-menu ${props.open ? 'open' : ''}`}>
      <ul>
        {menu.map((item, key) => (
          <MenuItem item={item} key={key} active={item.to === selected}/>
        ))
        }
      </ul>

    </div>
  );
};

export default SideMenu;