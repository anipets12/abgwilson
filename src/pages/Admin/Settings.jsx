import React, { useState } from 'react';

/**
 * Componente de configuración administrativa
 * Permite gestionar ajustes del sitio, SEO, integraciones y más
 */
const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  
  // Configuración general del sitio (simulada)
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'Abogado Wilson Legal',
    siteDescription: 'Plataforma de servicios legales profesionales en Ecuador',
    email: 'alexip2@hotmail.com',
    phone: '+593000000000',
    address: 'Ibarra, Ecuador',
    currency: 'USD',
    language: 'es',
    timezone: 'America/Guayaquil',
  });

  // Configuración de integraciones (simulada)
  const [integrations, setIntegrations] = useState({
    supabase: {
      enabled: true,
      apiKey: '••••••••••••••••••••',
      url: 'https://example.supabase.co'
    },
    stripe: {
      enabled: true,
      publicKey: '••••••••••••••••••••',
      secretKey: '••••••••••••••••••••'
    },
    paypal: {
      enabled: false,
      clientId: '',
      clientSecret: ''
    },
    cloudflare: {
      enabled: true,
      siteKey: '••••••••••••••••••••'
    }
  });

  // Función para cambiar de pestaña
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Componente de configuraciones generales
  const GeneralSettingsTab = () => (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Configuración General</h2>
      
      <form>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 mb-1">Nombre del sitio</label>
              <input
                type="text"
                id="siteName"
                className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                value={generalSettings.siteName}
                onChange={(e) => setGeneralSettings({...generalSettings, siteName: e.target.value})}
              />
            </div>
            <div>
              <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700 mb-1">Descripción del sitio</label>
              <input
                type="text"
                id="siteDescription"
                className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                value={generalSettings.siteDescription}
                onChange={(e) => setGeneralSettings({...generalSettings, siteDescription: e.target.value})}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                id="email"
                className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                value={generalSettings.email}
                onChange={(e) => setGeneralSettings({...generalSettings, email: e.target.value})}
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
              <input
                type="text"
                id="phone"
                className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                value={generalSettings.phone}
                onChange={(e) => setGeneralSettings({...generalSettings, phone: e.target.value})}
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
              <input
                type="text"
                id="address"
                className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                value={generalSettings.address}
                onChange={(e) => setGeneralSettings({...generalSettings, address: e.target.value})}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">Moneda</label>
              <select
                id="currency"
                className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                value={generalSettings.currency}
                onChange={(e) => setGeneralSettings({...generalSettings, currency: e.target.value})}
              >
                <option value="USD">Dólar estadounidense (USD)</option>
                <option value="EUR">Euro (EUR)</option>
                <option value="GBP">Libra esterlina (GBP)</option>
              </select>
            </div>
            <div>
              <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">Idioma</label>
              <select
                id="language"
                className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                value={generalSettings.language}
                onChange={(e) => setGeneralSettings({...generalSettings, language: e.target.value})}
              >
                <option value="es">Español</option>
                <option value="en">Inglés</option>
              </select>
            </div>
            <div>
              <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-1">Zona horaria</label>
              <select
                id="timezone"
                className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                value={generalSettings.timezone}
                onChange={(e) => setGeneralSettings({...generalSettings, timezone: e.target.value})}
              >
                <option value="America/Guayaquil">América/Guayaquil (ECT)</option>
                <option value="America/Bogota">América/Bogotá (COT)</option>
                <option value="America/Lima">América/Lima (PET)</option>
              </select>
            </div>
          </div>
          
          <div className="pt-4">
            <button
              type="button"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Guardar cambios
            </button>
          </div>
        </div>
      </form>
    </div>
  );

  // Componente de SEO
  const SeoSettingsTab = () => (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Configuración SEO</h2>
      
      <form>
        <div className="space-y-6">
          <div>
            <label htmlFor="metaTitle" className="block text-sm font-medium text-gray-700 mb-1">Meta título</label>
            <input
              type="text"
              id="metaTitle"
              className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              placeholder="Abogado Wilson | Servicios Legales en Ecuador"
            />
            <p className="mt-1 text-xs text-gray-500">Longitud recomendada: 50-60 caracteres</p>
          </div>
          
          <div>
            <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-700 mb-1">Meta descripción</label>
            <textarea
              id="metaDescription"
              rows={3}
              className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              placeholder="Ofrecemos servicios legales profesionales en áreas de derecho civil, familiar, penal y más. Consulta con expertos legales en Ecuador."
            />
            <p className="mt-1 text-xs text-gray-500">Longitud recomendada: 150-160 caracteres</p>
          </div>
          
          <div>
            <label htmlFor="ogImage" className="block text-sm font-medium text-gray-700 mb-1">Imagen para redes sociales (OG Image)</label>
            <div className="mt-1 flex items-center">
              <div className="h-32 w-64 bg-gray-100 rounded-md flex items-center justify-center border-2 border-dashed border-gray-300">
                <span className="text-gray-500">1200 x 630 px</span>
              </div>
              <button
                type="button"
                className="ml-4 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Subir imagen
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Indexación de motores de búsqueda</label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  id="allowIndexing"
                  name="indexing"
                  type="radio"
                  className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300"
                  defaultChecked
                />
                <label htmlFor="allowIndexing" className="ml-3 text-sm text-gray-700">
                  Permitir indexación (robots: index, follow)
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="preventIndexing"
                  name="indexing"
                  type="radio"
                  className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300"
                />
                <label htmlFor="preventIndexing" className="ml-3 text-sm text-gray-700">
                  Prevenir indexación (robots: noindex, nofollow)
                </label>
              </div>
            </div>
          </div>
          
          <div className="pt-4">
            <button
              type="button"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Guardar configuración SEO
            </button>
          </div>
        </div>
      </form>
    </div>
  );

  // Componente de integraciones
  const IntegrationsTab = () => (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Integraciones</h2>
      
      <div className="space-y-8">
        {/* Supabase */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-indigo-100 rounded-md flex items-center justify-center">
                <svg className="h-6 w-6 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21.8,19.1L16.9,7.5l-5.4,9.7h5.1l-5.8,5.9l1.3,1.3L21.8,19.1z M12.7,14.1H7.5l5.5-9.6l4.8,11.9L12.7,14.1z M12,2.3 C6.5,2.3,2.1,6.7,2.1,12.1s4.4,9.9,9.9,9.9s9.9-4.4,9.9-9.9S17.5,2.3,12,2.3z M12,23.5c-6.2,0-11.3-5.1-11.3-11.3S5.8,0.8,12,0.8 s11.3,5.1,11.3,11.3S18.2,23.5,12,23.5z"/>
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Supabase</h3>
                <p className="text-sm text-gray-500">Autenticación y base de datos</p>
              </div>
            </div>
            <div className="flex items-center">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${integrations.supabase.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                {integrations.supabase.enabled ? 'Conectado' : 'Desconectado'}
              </span>
              <button className="ml-4 text-primary-600 hover:text-primary-800 text-sm font-medium">
                Configurar
              </button>
            </div>
          </div>
        </div>
        
        {/* Stripe */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-blue-100 rounded-md flex items-center justify-center">
                <svg className="h-6 w-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.479 9.883c-1.626-.604-2.512-.931-2.512-1.635 0-.568.524-.931 1.403-.931 1.667 0 3.379.64 4.536 1.197l.666-4.001c-.919-.407-2.829-1.061-5.342-1.061-1.846 0-3.379.535-4.46 1.533-1.137 1.061-1.708 2.569-1.708 4.426 0 3.313 2.028 4.695 5.342 5.939 2.135.777 2.849 1.344 2.849 2.201 0 .872-.771 1.38-2.064 1.38-1.626 0-3.891-.826-5.479-1.939l-.682 4.066c1.367.872 3.891 1.744 6.524 1.744 1.944 0 3.577-.465 4.695-1.403 1.259-1.026 1.895-2.536 1.895-4.51-.001-3.397-2.079-4.813-5.663-6.006zM24 6.878C24 3.087 20.866 0 17.013 0H6.987C3.132 0 0 3.087 0 6.878v10.243C0 20.913 3.132 24 6.987 24h10.027C20.866 24 24 20.913 24 17.121V6.878z"/>
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Stripe</h3>
                <p className="text-sm text-gray-500">Procesamiento de pagos</p>
              </div>
            </div>
            <div className="flex items-center">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${integrations.stripe.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                {integrations.stripe.enabled ? 'Conectado' : 'Desconectado'}
              </span>
              <button className="ml-4 text-primary-600 hover:text-primary-800 text-sm font-medium">
                Configurar
              </button>
            </div>
          </div>
        </div>
        
        {/* PayPal */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-blue-100 rounded-md flex items-center justify-center">
                <svg className="h-6 w-6 text-blue-700" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9.112 7.571c-.452 0-.9.056-1.329.167-1.325.33-2.175 1.308-2.189 2.592-.016 1.421 1.088 2.061 2.418 2.069.349.004.698-.036 1.045-.117.786-.175 1.468-.644 1.898-1.307.39-.599.534-1.346.423-2.053-.132-.848-.792-1.351-2.266-1.351z"/>
                  <path d="M7.84 13.905c-.5 0-1.016.016-1.516.026-.15.049-.301.123-.451.182-.85.335-1.4.942-1.376 1.752.035 1.122.871 1.636 2.077 1.636.399 0 .782-.057 1.144-.158.709-.193 1.276-.612 1.564-1.162.298-.568.381-1.288.247-1.846-.099-.413-.474-.429-1.689-.429z"/>
                  <path d="M20.297 0H3.702C1.652 0 0 1.652 0 3.702v16.596C0 22.349 1.652 24 3.702 24h16.596c2.049 0 3.702-1.651 3.702-3.702V3.702C24 1.652 22.346 0 20.297 0zm-5.16 9.045c.057.301.086.612.088.942-.033 3.011-2.752 4.461-5.445 4.461-.312 0-.638-.028-.985-.082-2.037.736-2.334 2.252-2.334 2.85 0 .629.409.852.805.852h2.698c1.361 0 2.619.551 3.515 1.598.764.895 1.116 1.996 1.03 3.221-.038.551-.141 1.085-.309 1.598h1.836c.142-.513.229-1.048.263-1.598.074-1.225-.271-2.326-1.03-3.221-.9-1.047-2.16-1.598-3.522-1.598h-2.699c-.877 0-1.572-.495-1.733-1.277-.103-.505.026-1.057.359-1.562-1.442-.937-2.236-2.361-2.23-3.985.015-2.933 2.713-5.446 6.039-5.446.345 0 .696.026 1.05.081 1.731-.622 2.416-1.32 3.1-2.506.029-.05.055-.1.08-.15h-3.358c-.396.61-.98 1.281-1.781 1.717.381-.038.761-.056 1.133-.056 1.655 0 3.175.524 4.064 1.536.72.822.938 1.84.647 2.783z"/>
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">PayPal</h3>
                <p className="text-sm text-gray-500">Procesamiento de pagos alternativo</p>
              </div>
            </div>
            <div className="flex items-center">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${integrations.paypal.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                {integrations.paypal.enabled ? 'Conectado' : 'Desconectado'}
              </span>
              <button className="ml-4 text-primary-600 hover:text-primary-800 text-sm font-medium">
                Configurar
              </button>
            </div>
          </div>
        </div>
        
        {/* Cloudflare */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-orange-100 rounded-md flex items-center justify-center">
                <svg className="h-6 w-6 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.5,9c-0.7,0-1.4,0.3-2,0.8L8.7,8.4c0-0.2,0.1-0.4,0.1-0.6C8.8,6.2,7.4,4.8,5.8,4.8S2.8,6.2,2.8,7.8c0,1.6,1.3,3,3,3c0.7,0,1.4-0.3,2-0.8l5.8,1.4C13.5,11.7,13.5,11.8,13.5,12c0,0.2,0,0.3-0.1,0.5l3.6,1.9c0.5-0.6,1.3-1,2.2-1c1.5,0,2.8,1.2,2.8,2.8s-1.2,2.8-2.8,2.8s-2.8-1.2-2.8-2.8c0-0.2,0-0.4,0.1-0.5l-3.6-1.9c-0.5,0.6-1.3,1-2.2,1c-1.5,0-2.8-1.2-2.8-2.8s1.2-2.8,2.8-2.8c0.7,0,1.4,0.3,2,0.8l5.8-1.4c0-0.2,0.1-0.4,0.1-0.6c0-1.6-1.3-3-3-3Z"/>
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Cloudflare Turnstile</h3>
                <p className="text-sm text-gray-500">Protección contra bots</p>
              </div>
            </div>
            <div className="flex items-center">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${integrations.cloudflare.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                {integrations.cloudflare.enabled ? 'Conectado' : 'Desconectado'}
              </span>
              <button className="ml-4 text-primary-600 hover:text-primary-800 text-sm font-medium">
                Configurar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Configuración</h1>
        <p className="text-sm text-gray-600 mt-1">
          Administre la configuración del sitio, SEO e integraciones
        </p>
      </div>

      {/* Pestañas de navegación */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'general' 
                  ? 'border-primary-500 text-primary-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => handleTabChange('general')}
            >
              General
            </button>
            <button
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'seo' 
                  ? 'border-primary-500 text-primary-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => handleTabChange('seo')}
            >
              SEO
            </button>
            <button
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'integrations' 
                  ? 'border-primary-500 text-primary-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => handleTabChange('integrations')}
            >
              Integraciones
            </button>
          </nav>
        </div>
      </div>

      {/* Contenido de la pestaña seleccionada */}
      <div>
        {activeTab === 'general' && <GeneralSettingsTab />}
        {activeTab === 'seo' && <SeoSettingsTab />}
        {activeTab === 'integrations' && <IntegrationsTab />}
      </div>
    </div>
  );
};

export default AdminSettings;
