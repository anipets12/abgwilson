import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Abg. Wilson Alexander Ipiales Guerron</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-gray-300">Inicio</Link>
          <Link to="/servicios" className="hover:text-gray-300">Servicios</Link>
          <Link to="/contacto" className="hover:text-gray-300">Contacto</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
