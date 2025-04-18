import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Página de Términos y Condiciones
 * Muestra los términos legales que rigen el uso del sitio y los servicios
 */
const TermsConditions = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Términos y Condiciones</h1>
          
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-4">
              Última actualización: 18 de abril de 2025
            </p>
            
            <p className="mb-4">
              Estos Términos y Condiciones ("Términos") rigen su acceso y uso del sitio web abogadowilson.com, así como los servicios legales proporcionados por Wilson Alexander Ipiales Guerron ("nosotros", "nuestro", o "Abogado Wilson"). Al acceder o utilizar nuestro sitio web o servicios, usted acepta estar sujeto a estos Términos.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">1. Aceptación de los Términos</h2>
            
            <p className="mb-4">
              Al acceder o utilizar nuestro sitio web y servicios, usted confirma que:
            </p>
            
            <ul className="list-disc pl-6 mb-4">
              <li>Ha leído y comprende estos Términos</li>
              <li>Acepta cumplir con estos Términos</li>
              <li>Tiene la capacidad legal para celebrar un contrato vinculante</li>
              <li>Es mayor de 18 años o cuenta con la autorización de un tutor legal</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">2. Descripción de los Servicios</h2>
            
            <p className="mb-4">
              Ofrecemos servicios legales en diversas áreas del derecho, incluyendo pero no limitado a derecho civil, familiar, mercantil, administrativo y penal. Nuestros servicios pueden incluir:
            </p>
            
            <ul className="list-disc pl-6 mb-4">
              <li>Asesoramiento legal profesional</li>
              <li>Representación en procedimientos judiciales y administrativos</li>
              <li>Redacción y revisión de documentos legales</li>
              <li>Recursos educativos a través de nuestro sitio web y e-books</li>
              <li>Consultas presenciales y virtuales</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">3. Uso del Sitio Web</h2>
            
            <p className="mb-4">
              Al utilizar nuestro sitio web, usted acepta:
            </p>
            
            <ul className="list-disc pl-6 mb-4">
              <li>No utilizar el sitio para fines ilegales o no autorizados</li>
              <li>No intentar acceder a áreas restringidas del sitio</li>
              <li>No interferir con la seguridad o funcionamiento del sitio</li>
              <li>No cargar o transmitir virus o malware</li>
              <li>No suplantar la identidad de otra persona</li>
              <li>No recopilar información de otros usuarios sin autorización</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">4. Relación Abogado-Cliente</h2>
            
            <p className="mb-4">
              La simple navegación por nuestro sitio web o la lectura de nuestro contenido no establece una relación abogado-cliente. Esta relación solo se establece mediante un acuerdo formal y explícito de representación legal.
            </p>
            
            <p className="mb-4">
              La información proporcionada en nuestro sitio web es de carácter general y no constituye asesoramiento legal para casos específicos. Cada caso legal es único y requiere un análisis individualizado.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">5. Pagos y Honorarios</h2>
            
            <p className="mb-4">
              Los honorarios por nuestros servicios legales se acuerdan específicamente para cada caso o servicio. Para los productos y servicios disponibles a través de nuestro sitio web (como e-books o suscripciones):
            </p>
            
            <ul className="list-disc pl-6 mb-4">
              <li>Todos los precios se muestran en dólares estadounidenses e incluyen impuestos aplicables</li>
              <li>Los pagos se procesan a través de proveedores seguros de terceros</li>
              <li>Nos reservamos el derecho de modificar los precios en cualquier momento</li>
              <li>Las suscripciones se renuevan automáticamente hasta su cancelación</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">6. Política de Reembolso</h2>
            
            <p className="mb-4">
              Para servicios legales profesionales, la política de reembolso se establece en el contrato de servicios específico. Para productos digitales:
            </p>
            
            <ul className="list-disc pl-6 mb-4">
              <li>Los e-books y materiales digitales no son reembolsables una vez descargados</li>
              <li>Las suscripciones pueden cancelarse en cualquier momento, pero no generan reembolsos proporcionales por períodos parciales</li>
              <li>En caso de problemas técnicos que impidan el acceso al contenido adquirido, ofrecemos soporte técnico y posible reembolso si el problema no puede resolverse</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">7. Propiedad Intelectual</h2>
            
            <p className="mb-4">
              Todo el contenido presente en nuestro sitio web, incluyendo textos, gráficos, logotipos, imágenes, e-books, vídeos y software está protegido por derechos de propiedad intelectual. No está permitido:
            </p>
            
            <ul className="list-disc pl-6 mb-4">
              <li>Copiar, reproducir o distribuir nuestro contenido sin autorización</li>
              <li>Utilizar nuestro contenido con fines comerciales sin permiso explícito</li>
              <li>Modificar o crear obras derivadas basadas en nuestro contenido</li>
              <li>Eliminar avisos de derechos de autor o marcas registradas</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">8. Limitación de Responsabilidad</h2>
            
            <p className="mb-4">
              En la medida permitida por la ley, no seremos responsables por:
            </p>
            
            <ul className="list-disc pl-6 mb-4">
              <li>Daños indirectos, incidentales o consecuentes</li>
              <li>Pérdida de beneficios, ingresos, datos o uso</li>
              <li>Interrupción del servicio o fallos técnicos</li>
              <li>Inexactitudes o errores en el contenido del sitio</li>
              <li>Acciones basadas en la información general proporcionada en el sitio</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">9. Indemnización</h2>
            
            <p className="mb-4">
              Usted acepta indemnizar y mantener indemne a Wilson Alexander Ipiales Guerron y sus colaboradores frente a cualquier reclamación, demanda, responsabilidad, daño o gasto (incluidos honorarios de abogados) que surjan de su incumplimiento de estos Términos o su uso inadecuado del sitio web o servicios.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">10. Modificaciones</h2>
            
            <p className="mb-4">
              Nos reservamos el derecho de modificar estos Términos en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación en el sitio web. Es su responsabilidad revisar periódicamente estos Términos para mantenerse informado de las actualizaciones.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">11. Legislación Aplicable</h2>
            
            <p className="mb-4">
              Estos Términos se rigen e interpretan de acuerdo con las leyes de Ecuador. Cualquier disputa relacionada con estos Términos estará sujeta a la jurisdicción exclusiva de los tribunales de Ecuador.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">12. Contacto</h2>
            
            <p className="mb-4">
              Si tiene preguntas sobre estos Términos, puede contactarnos a través de:
            </p>
            
            <ul className="list-disc pl-6 mb-4">
              <li>Correo electrónico: alexip2@hotmail.com</li>
              <li>Teléfono: (06) 2-123-456</li>
              <li>Dirección: Ibarra, Ecuador</li>
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <Link to="/legal/privacidad" className="text-primary-600 hover:text-primary-800">
              Ver Política de Privacidad
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
