import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Página de Política de Privacidad
 * Muestra los términos legales relacionados con la privacidad del usuario
 */
const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Política de Privacidad</h1>
          
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-4">
              Última actualización: 18 de abril de 2025
            </p>
            
            <p className="mb-4">
              Wilson Alexander Ipiales Guerron, con domicilio en Ibarra, Ecuador, es responsable del tratamiento de los datos personales proporcionados por los usuarios de este sitio web y servicios legales asociados.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">1. Información que recopilamos</h2>
            
            <p className="mb-4">
              Recopilamos los siguientes datos personales:
            </p>
            
            <ul className="list-disc pl-6 mb-4">
              <li>Nombre completo</li>
              <li>Información de contacto (correo electrónico, teléfono, dirección)</li>
              <li>Número de identificación o cédula</li>
              <li>Información financiera necesaria para procesar pagos</li>
              <li>Detalles sobre consultas legales y casos</li>
              <li>Información sobre dispositivo y navegación al usar nuestro sitio web</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">2. Finalidad del tratamiento de datos</h2>
            
            <p className="mb-4">
              Los datos personales que recopilamos son utilizados para:
            </p>
            
            <ul className="list-disc pl-6 mb-4">
              <li>Proporcionar servicios legales y asesoramiento jurídico</li>
              <li>Gestionar la relación con los clientes y responder a consultas</li>
              <li>Procesar pagos por servicios prestados</li>
              <li>Enviar información relevante sobre casos o servicios contratados</li>
              <li>Cumplir con obligaciones legales y regulatorias</li>
              <li>Mejorar nuestros servicios y experiencia de usuario</li>
              <li>Enviar comunicaciones de marketing (solo con consentimiento explícito)</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">3. Base legal para el tratamiento</h2>
            
            <p className="mb-4">
              Tratamos sus datos personales basándonos en:
            </p>
            
            <ul className="list-disc pl-6 mb-4">
              <li>El consentimiento que usted proporciona al utilizar nuestros servicios</li>
              <li>La necesidad de ejecutar un contrato de servicios legales</li>
              <li>Nuestros intereses legítimos como despacho de abogados</li>
              <li>El cumplimiento de obligaciones legales a las que estamos sujetos</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">4. Confidencialidad y seguridad</h2>
            
            <p className="mb-4">
              Implementamos medidas técnicas y organizativas para proteger sus datos personales contra acceso no autorizado, alteración, divulgación o destrucción. Estas medidas incluyen:
            </p>
            
            <ul className="list-disc pl-6 mb-4">
              <li>Cifrado de datos sensibles</li>
              <li>Protocolos de seguridad en nuestra plataforma web</li>
              <li>Acceso restringido a la información confidencial</li>
              <li>Capacitación regular del personal sobre protección de datos</li>
              <li>Evaluaciones periódicas de seguridad</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">5. Compartir información con terceros</h2>
            
            <p className="mb-4">
              Podemos compartir sus datos personales con:
            </p>
            
            <ul className="list-disc pl-6 mb-4">
              <li>Proveedores de servicios que nos ayudan a operar nuestra plataforma</li>
              <li>Instituciones financieras para procesar pagos</li>
              <li>Autoridades judiciales o administrativas cuando sea legalmente requerido</li>
              <li>Otros profesionales legales involucrados en su caso, con su autorización</li>
            </ul>
            
            <p className="mb-4">
              No vendemos, alquilamos ni compartimos su información personal con terceros para fines de marketing sin su consentimiento explícito.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">6. Derechos de los usuarios</h2>
            
            <p className="mb-4">
              Como titular de los datos personales, usted tiene derecho a:
            </p>
            
            <ul className="list-disc pl-6 mb-4">
              <li>Acceder a sus datos personales</li>
              <li>Rectificar datos inexactos</li>
              <li>Solicitar la eliminación de sus datos</li>
              <li>Oponerse al tratamiento de sus datos</li>
              <li>Limitar el procesamiento de sus datos</li>
              <li>Solicitar la portabilidad de sus datos</li>
              <li>Retirar su consentimiento en cualquier momento</li>
            </ul>
            
            <p className="mb-4">
              Para ejercer estos derechos, puede contactarnos a través de los medios indicados al final de esta política.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">7. Conservación de datos</h2>
            
            <p className="mb-4">
              Conservamos sus datos personales durante el tiempo necesario para cumplir con los fines para los que fueron recopilados, incluido el cumplimiento de requisitos legales, contables o de informes. El periodo de retención específico varía según la naturaleza de la información y los requisitos legales aplicables.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">8. Cookies y tecnologías similares</h2>
            
            <p className="mb-4">
              Nuestro sitio web utiliza cookies y tecnologías similares para mejorar la experiencia del usuario, analizar el tráfico y personalizar el contenido. Puede configurar su navegador para rechazar todas las cookies o para que le avise cuando se envía una cookie. Sin embargo, algunas funciones del sitio pueden no funcionar correctamente si las cookies están deshabilitadas.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">9. Cambios a esta política</h2>
            
            <p className="mb-4">
              Podemos actualizar nuestra Política de Privacidad periódicamente. Cualquier cambio será publicado en esta página con una fecha de actualización revisada. Le recomendamos revisar esta política regularmente para estar informado sobre cómo protegemos su información.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">10. Contacto</h2>
            
            <p className="mb-4">
              Si tiene preguntas o inquietudes sobre esta Política de Privacidad o el tratamiento de sus datos personales, puede contactarnos a través de:
            </p>
            
            <ul className="list-disc pl-6 mb-4">
              <li>Correo electrónico: alexip2@hotmail.com</li>
              <li>Teléfono: (06) 2-123-456</li>
              <li>Dirección: Ibarra, Ecuador</li>
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <Link to="/legal/terminos" className="text-primary-600 hover:text-primary-800">
              Ver Términos y Condiciones
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
