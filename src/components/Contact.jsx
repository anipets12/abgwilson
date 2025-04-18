import React from 'react';

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Contacto</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Información de Contacto</h2>
            <p className="mb-2"><strong>Abogado:</strong> Wilson Alexander Ipiales Guerron</p>
            <p className="mb-2"><strong>Ubicación:</strong> Ibarra, Ecuador</p>
            <p className="mb-2"><strong>Teléfono:</strong> +593 988835269</p>
            <p className="mb-2"><strong>Email:</strong> alexip2@hotmail.com</p>
            <p className="mb-2"><strong>Horario:</strong> Lunes a Viernes, 9:00 AM - 6:00 PM</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Envíe su Consulta</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Nombre</label>
                <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Email</label>
                <input type="email" className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Mensaje</label>
                <textarea rows="4" className="w-full border border-gray-300 rounded px-3 py-2"></textarea>
              </div>
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
