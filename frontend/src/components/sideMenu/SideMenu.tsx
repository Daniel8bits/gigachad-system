import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa'
import { useSelector } from "@store/Root.store";
import MenuItem, {IMenuItem} from '../menuItem/MenuItem';

export enum UserType {
  user = 0,
  customer = 2,
  //employee = 4,
  attendant = 8,
  manager = 16,
  financer = 32,
  trainer = 64
}

const menuConfig: Record<number, IMenuItem[]> = {
  [UserType.customer]:[
    {
      to: "/trainings",
      text: "Treinos",
      submenu:[
        {
          to: "/calendar",
          text: "Calendário de Treinos"
        },
        {
          to: "/trainings",
          text: "Meus Treinos"
        },
        {
          to: "/tutorials",
          text: "Tutoriais de exercícios"
        } 
      ]
    },
    {
      to: "/payments",
      text: "Pagamentos",
      submenu:[
        {
          to: "/invoice/payment",
          text: "Pagar Fatura"
        },
        {
          to: "/payments",
          text: "Histórico de Pagamentos"
        },
        {
          to: "/plans",
          text: "Alterar Planos"
        } 
      ]
    },
    {
      to: "/credit-cards",
      text: "Gerenciar Cartões"
    }
  ],
  [UserType.attendant]: [
    {
      to: "/customers",
      text: "Clientes"
    },
    {
      to: "/payments",
      text: "Pagamentos"
    }
  ],
  [UserType.trainer]: [
    {
      to: "/customers",
      text: "Clientes"
    },/*
    {
      to: "/trainings",
      text: "Treinos"
    }*/
  ],
  [UserType.financer]: [
    {
      to: "/customers",
      text: "Clientes"
    },
    {
      
      to: "/payments",
      text: "Pagamentos"
    },
    {
      to:"/expenses",
      text: "Gastos"
    }
  ],
  [UserType.manager]: [
    {
      to: "/customers",
      text: "Clientes"
    },
    {
      to: "/employee",
      text: "Funcionários"
    },
    {
      to:"/expenses",
      text: "Gastos"
    },
    {
      to: "/equipments",
      text: "Equipamentos"
    },
    {
      to: "/plans",
      text: "Planos",
    },
    {
      to: "/tutorail",
      text: "Tutoriais",
    }/*,
    {
      to: "/expenses",
      text: "Gastos",
      submenu: [
        {
          to: "/expenses",
          text: "Gastos"
        }
      ]
    }*/
  ]
}


interface SideMenuProps {
  open: boolean
}



const SideMenu: React.FC<SideMenuProps> = (props) => {
  const auth = useSelector(state => state.auth);
  const location = useLocation();
  const selected = location.pathname;
  const menu = useMemo(() => menuConfig[auth.account?.type ?? UserType.user], []);
  
  return (
    <div className={`side-menu ${props.open ? 'open' : ''}`}>
      <ul>
        <MenuItem item={{to: "/",text: "Home"}} active={selected === "/"}/>
        {menu.map((item, key) => (
          <MenuItem item={item} key={key} active={item.to === selected}/>
        ))
        }
      </ul>

    </div>
  );
};

export default SideMenu;