import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';

/**
 * Componente de gestión de contenido para administradores
 * Permite crear, editar y gestionar blog posts, artículos y otro contenido del sitio
 */
const AdminContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(getInitialTab());

  // Determinar la pestaña activa basada en la URL
  function getInitialTab() {
    const path = location.pathname;
    if (path.includes('/blog')) return 'blog';
    if (path.includes('/forum')) return 'forum';
    if (path.includes('/ebooks')) return 'ebooks';
    if (path.includes('/resources')) return 'resources';
    return 'blog'; // Por defecto
  }

  // Cambiar la pestaña activa
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(`/admin/content/${tab}`);
  };

  // Componente para la gestión del blog
  const BlogManagement = () => {
    const [posts, setPosts] = useState([
      { id: 1, title: 'Derechos laborales en Ecuador', status: 'published', author: 'Wilson Ipiales', date: '2025-03-15', views: 245 },
      { id: 2, title: 'Guía para procesos de divorcio', status: 'published', author: 'Wilson Ipiales', date: '2025-03-28', views: 189 },
      { id: 3, title: 'Contratación pública: nuevas normativas', status: 'draft', author: 'María López', date: '2025-04-10', views: 0 },
      { id: 4, title: 'El nuevo código penal explicado', status: 'published', author: 'Wilson Ipiales', date: '2025-02-20', views: 312 },
      { id: 5, title: 'Derechos del consumidor', status: 'scheduled', author: 'Carlos Ramírez', date: '2025-04-25', views: 0 },
    ]);

    const getStatusBadge = (status) => {
      switch(status) {
        case 'published':
          return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Publicado</span>;
        case 'draft':
          return <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Borrador</span>;
        case 'scheduled':
          return <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">Programado</span>;
        default:
          return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">{status}</span>;
      }
    };

    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Artículos del Blog</h2>
          <button className="btn bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md">
            Nuevo Artículo
          </button>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead className="text-xs font-semibold uppercase text-gray-500 bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Título</div>
                  </th>
                  <th className="px-4 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Estado</div>
                  </th>
                  <th className="px-4 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Autor</div>
                  </th>
                  <th className="px-4 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Fecha</div>
                  </th>
                  <th className="px-4 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Vistas</div>
                  </th>
                  <th className="px-4 py-3 whitespace-nowrap">
                    <div className="font-semibold text-center">Acciones</div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-200">
                {posts.map(post => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="font-medium text-gray-800">{post.title}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-left">{getStatusBadge(post.status)}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-left">{post.author}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-left font-medium text-gray-500">{post.date}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-left font-medium text-gray-500">{post.views}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-center space-x-1">
                        <button className="text-blue-600 hover:text-blue-900 p-1">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                          </svg>
                        </button>
                        <button className="text-red-600 hover:text-red-900 p-1">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Componente para la gestión del foro
  const ForumManagement = () => {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Temas del Foro</h2>
          <button className="btn bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md">
            Nuevo Tema
          </button>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="text-gray-500">Herramientas para gestionar temas, comentarios y moderación del foro.</p>
          <div className="mt-4 space-y-4">
            <div className="p-4 border border-gray-200 rounded-md">
              <h3 className="font-medium text-gray-800">Moderación de comentarios</h3>
              <p className="text-sm text-gray-600 mt-1">Revise y apruebe comentarios nuevos de los usuarios.</p>
              <button className="mt-2 text-primary-600 hover:text-primary-800 text-sm font-medium">
                Ver comentarios pendientes (12)
              </button>
            </div>
            <div className="p-4 border border-gray-200 rounded-md">
              <h3 className="font-medium text-gray-800">Reportes de usuarios</h3>
              <p className="text-sm text-gray-600 mt-1">Revise contenido reportado como inapropiado.</p>
              <button className="mt-2 text-primary-600 hover:text-primary-800 text-sm font-medium">
                Ver reportes (3)
              </button>
            </div>
            <div className="p-4 border border-gray-200 rounded-md">
              <h3 className="font-medium text-gray-800">Categorías del foro</h3>
              <p className="text-sm text-gray-600 mt-1">Administre las categorías disponibles para discusión.</p>
              <button className="mt-2 text-primary-600 hover:text-primary-800 text-sm font-medium">
                Administrar categorías
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Componente para la gestión de ebooks
  const EbooksManagement = () => {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">E-Books Legales</h2>
          <button className="btn bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md">
            Nuevo E-Book
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="aspect-w-2 aspect-h-3 mb-4 bg-gray-200 rounded-md">
              <div className="flex items-center justify-center h-40 bg-primary-100 text-primary-800 rounded-md">
                <span className="text-lg font-medium">Vista previa portada</span>
              </div>
            </div>
            <h3 className="font-medium text-gray-900 mb-1">Guía Completa de Derechos Laborales</h3>
            <p className="text-sm text-gray-600 mb-2">PDF, 45 páginas</p>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-900">$15.99</span>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Publicado</span>
            </div>
            <div className="mt-3 flex space-x-2">
              <button className="text-blue-600 hover:text-blue-900 text-sm">Editar</button>
              <button className="text-gray-600 hover:text-gray-900 text-sm">Ver estadísticas</button>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="aspect-w-2 aspect-h-3 mb-4 bg-gray-200 rounded-md">
              <div className="flex items-center justify-center h-40 bg-primary-100 text-primary-800 rounded-md">
                <span className="text-lg font-medium">Vista previa portada</span>
              </div>
            </div>
            <h3 className="font-medium text-gray-900 mb-1">Manual de Procesos Civiles</h3>
            <p className="text-sm text-gray-600 mb-2">PDF, 72 páginas</p>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-900">$19.99</span>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Publicado</span>
            </div>
            <div className="mt-3 flex space-x-2">
              <button className="text-blue-600 hover:text-blue-900 text-sm">Editar</button>
              <button className="text-gray-600 hover:text-gray-900 text-sm">Ver estadísticas</button>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="aspect-w-2 aspect-h-3 mb-4 bg-gray-200 rounded-md">
              <div className="flex items-center justify-center h-40 bg-primary-100 text-primary-800 rounded-md">
                <span className="text-lg font-medium">Vista previa portada</span>
              </div>
            </div>
            <h3 className="font-medium text-gray-900 mb-1">Guía de Derecho Familiar</h3>
            <p className="text-sm text-gray-600 mb-2">PDF, 58 páginas</p>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-900">$12.99</span>
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Borrador</span>
            </div>
            <div className="mt-3 flex space-x-2">
              <button className="text-blue-600 hover:text-blue-900 text-sm">Editar</button>
              <button className="text-gray-600 hover:text-gray-900 text-sm">Vista previa</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Componente para la gestión de recursos legales
  const ResourcesManagement = () => {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Recursos Legales</h2>
          <button className="btn bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md">
            Nuevo Recurso
          </button>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="text-gray-500">Administre plantillas, formularios y recursos descargables para usuarios premium.</p>
          
          <div className="mt-6 space-y-4">
            <div className="border border-gray-200 rounded-md p-4">
              <div className="flex items-center justify-between">
                <div>
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <div className="flex-1 ml-4">
                  <h3 className="font-medium text-gray-900">Plantilla de Demanda Civil</h3>
                  <p className="text-sm text-gray-600">Documento Word editable con estructura básica de demanda civil.</p>
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-gray-500">Descargas: 128</span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-xs text-gray-500">Actualizado: 2025-02-15</span>
                  </div>
                </div>
                <div>
                  <button className="text-blue-600 hover:text-blue-900 p-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-md p-4">
              <div className="flex items-center justify-between">
                <div>
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <div className="flex-1 ml-4">
                  <h3 className="font-medium text-gray-900">Formato de Contrato de Arrendamiento</h3>
                  <p className="text-sm text-gray-600">Plantilla completa de contrato de arrendamiento adaptado a legislación ecuatoriana.</p>
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-gray-500">Descargas: 245</span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-xs text-gray-500">Actualizado: 2025-03-10</span>
                  </div>
                </div>
                <div>
                  <button className="text-blue-600 hover:text-blue-900 p-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-md p-4">
              <div className="flex items-center justify-between">
                <div>
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <div className="flex-1 ml-4">
                  <h3 className="font-medium text-gray-900">Checklist para Procesos de Divorcio</h3>
                  <p className="text-sm text-gray-600">Lista completa de documentos y pasos para procesos de divorcio.</p>
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-gray-500">Descargas: 102</span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-xs text-gray-500">Actualizado: 2025-01-22</span>
                  </div>
                </div>
                <div>
                  <button className="text-blue-600 hover:text-blue-900 p-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Gestión de Contenido</h1>
        <p className="text-sm text-gray-600 mt-1">
          Administre el contenido del sitio web: blog, foro, ebooks y recursos
        </p>
      </div>

      {/* Pestañas de navegación */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'blog' 
                  ? 'border-primary-500 text-primary-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => handleTabChange('blog')}
            >
              Blog
            </button>
            <button
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'forum' 
                  ? 'border-primary-500 text-primary-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => handleTabChange('forum')}
            >
              Foro
            </button>
            <button
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'ebooks' 
                  ? 'border-primary-500 text-primary-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => handleTabChange('ebooks')}
            >
              E-Books
            </button>
            <button
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'resources' 
                  ? 'border-primary-500 text-primary-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => handleTabChange('resources')}
            >
              Recursos
            </button>
          </nav>
        </div>
      </div>

      {/* Contenido de la pestaña seleccionada */}
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/admin/content/blog" replace />} />
          <Route path="/blog" element={<BlogManagement />} />
          <Route path="/forum" element={<ForumManagement />} />
          <Route path="/ebooks" element={<EbooksManagement />} />
          <Route path="/resources" element={<ResourcesManagement />} />
        </Routes>

        {/* Renderizar contenido basado en la pestaña activa cuando no estamos usando Routes */}
        {!window.location.pathname.includes('/admin/content/') && (
          <>
            {activeTab === 'blog' && <BlogManagement />}
            {activeTab === 'forum' && <ForumManagement />}
            {activeTab === 'ebooks' && <EbooksManagement />}
            {activeTab === 'resources' && <ResourcesManagement />}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminContent;
