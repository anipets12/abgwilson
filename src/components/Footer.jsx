import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-auto">
      <div className="container mx-auto text-center">
        <p>© {new Date().getFullYear()} Abg. Wilson Alexander Ipiales Guerron. Todos los derechos reservados.</p>
        <p>Contacto: +593 988835269 | alexip2@hotmail.com</p>
      </div>
    </footer>
  );
};

export default Footer;
