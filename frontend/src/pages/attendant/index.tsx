import React from 'react';
import { Link } from 'react-router-dom';

const Attendant= () => {
  return (
    <div>
      <Link to='/customer'> Clientes </Link>;
      <Link to='/payments'> Pagamentos </Link>;
    </div>
  );
};

export default Attendant;