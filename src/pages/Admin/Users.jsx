import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * Componente de administración de usuarios
 * Permite gestionar usuarios del sistema, cambiar roles y permisos
 */
const AdminUsers = () => {
  // Estado para almacenar la lista de usuarios
  const [users, setUsers] = useState([]);
  // Estado para el filtro de búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  // Estado para el filtro de rol
  const [roleFilter, setRoleFilter] = useState('all');
  // Estado para el usuario en edición
  const [editingUser, setEditingUser] = useState(null);
  // Estado para mostrar confirmación de eliminación
  const [userToDelete, setUserToDelete] = useState(null);
  // Estado para el mensaje de operación
  const [operationMessage, setOperationMessage] = useState({ type: '', message: '' });

  // Datos de usuarios simulados para desarrollo
  const mockUsers = [
    { id: 1, name: 'Juan Pérez', email: 'juan@example.com', role: 'client', status: 'active', lastLogin: '2025-04-10', registeredDate: '2024-08-15' },
    { id: 2, name: 'María López', email: 'maria@example.com', role: 'client', status: 'active', lastLogin: '2025-04-15', registeredDate: '2024-09-20' },
    { id: 3, name: 'Wilson Ipiales', email: 'wilson@example.com', role: 'admin', status: 'active', lastLogin: '2025-04-18', registeredDate: '2024-01-01' },
    { id: 4, name: 'Carlos Ramírez', email: 'carlos@example.com', role: 'editor', status: 'inactive', lastLogin: '2025-03-30', registeredDate: '2024-10-05' },
    { id: 5, name: 'Ana Suárez', email: 'ana@example.com', role: 'client', status: 'pending', lastLogin: null, registeredDate: '2025-04-01' },
    { id: 6, name: 'Roberto González', email: 'roberto@example.com', role: 'affiliate', status: 'active', lastLogin: '2025-04-12', registeredDate: '2024-11-15' },
    { id: 7, name: 'Elena Castro', email: 'elena@example.com', role: 'client', status: 'active', lastLogin: '2025-04-05', registeredDate: '2024-12-20' },
    { id: 8, name: 'Pedro Morales', email: 'pedro@example.com', role: 'client', status: 'inactive', lastLogin: '2025-02-10', registeredDate: '2024-07-30' },
  ];

  // Cargar usuarios al montar el componente
  useEffect(() => {
    // En producción, aquí haríamos una llamada a la API
    // fetchUsers();
    
    // Para desarrollo, cargamos datos de prueba
    setUsers(mockUsers);
  }, []);

  // Función para buscar usuarios
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Función para filtrar por rol
  const handleRoleFilter = (e) => {
    setRoleFilter(e.target.value);
  };

  // Función para editar usuario
  const handleEditUser = (user) => {
    setEditingUser({...user});
  };

  // Función para guardar cambios del usuario
  const handleSaveUser = () => {
    if (!editingUser) return;
    
    // En producción, aquí haríamos una llamada a la API para actualizar el usuario
    // updateUser(editingUser);
    
    // Para desarrollo, actualizamos en el estado local
    setUsers(users.map(user => user.id === editingUser.id ? editingUser : user));
    setOperationMessage({ type: 'success', message: 'Usuario actualizado correctamente' });
    setEditingUser(null);

    // Limpiar el mensaje después de 3 segundos
    setTimeout(() => {
      setOperationMessage({ type: '', message: '' });
    }, 3000);
  };

  // Función para cancelar edición
  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  // Función para confirmar eliminación
  const handleDeleteConfirm = (user) => {
    setUserToDelete(user);
  };

  // Función para eliminar usuario
  const handleDeleteUser = () => {
    if (!userToDelete) return;
    
    // En producción, aquí haríamos una llamada a la API para eliminar el usuario
    // deleteUser(userToDelete.id);
    
    // Para desarrollo, eliminamos del estado local
    setUsers(users.filter(user => user.id !== userToDelete.id));
    setOperationMessage({ type: 'success', message: 'Usuario eliminado correctamente' });
    setUserToDelete(null);

    // Limpiar el mensaje después de 3 segundos
    setTimeout(() => {
      setOperationMessage({ type: '', message: '' });
    }, 3000);
  };

  // Función para cancelar eliminación
  const handleCancelDelete = () => {
    setUserToDelete(null);
  };

  // Filtrar usuarios según los criterios de búsqueda y rol
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  // Obtener badge de estado
  const getStatusBadge = (status) => {
    switch(status) {
      case 'active':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Activo</span>;
      case 'inactive':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">Inactivo</span>;
      case 'pending':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Pendiente</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  // Obtener badge de rol
  const getRoleBadge = (role) => {
    switch(role) {
      case 'admin':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">Administrador</span>;
      case 'editor':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">Editor</span>;
      case 'affiliate':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800">Afiliado</span>;
      case 'client':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">Cliente</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">{role}</span>;
    }
  };

  // Animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      {/* Encabezado */}
      <motion.div
        className="sm:flex sm:justify-between sm:items-center mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="mb-4 sm:mb-0" variants={itemVariants}>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Gestión de Usuarios</h1>
          <p className="text-sm text-gray-600 mt-1">
            Administra los usuarios, roles y permisos del sistema
          </p>
        </motion.div>

        <motion.div className="flex flex-wrap gap-3" variants={itemVariants}>
          <button 
            className="btn bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md"
            onClick={() => handleEditUser({
              id: Math.max(...users.map(u => u.id), 0) + 1,
              name: '',
              email: '',
              role: 'client',
              status: 'pending',
              lastLogin: null,
              registeredDate: new Date().toISOString().split('T')[0]
            })}
          >
            <svg className="w-4 h-4 fill-current opacity-50 shrink-0 mr-2" viewBox="0 0 16 16">
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
            <span>Añadir Usuario</span>
          </button>
        </motion.div>
      </motion.div>

      {/* Mensaje de operación */}
      {operationMessage.message && (
        <motion.div 
          className={`mb-4 p-3 rounded-md ${operationMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          {operationMessage.message}
        </motion.div>
      )}

      {/* Filtros */}
      <motion.div 
        className="bg-white shadow-md rounded-lg mb-8 p-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="md:flex md:justify-between md:items-center space-y-4 md:space-y-0">
          <div className="w-full md:w-1/3">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Buscar usuarios</label>
            <input
              type="text"
              id="search"
              className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              placeholder="Buscar por nombre o email..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="w-full md:w-1/4">
            <label htmlFor="roleFilter" className="block text-sm font-medium text-gray-700 mb-1">Filtrar por rol</label>
            <select
              id="roleFilter"
              className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              value={roleFilter}
              onChange={handleRoleFilter}
            >
              <option value="all">Todos los roles</option>
              <option value="admin">Administradores</option>
              <option value="editor">Editores</option>
              <option value="affiliate">Afiliados</option>
              <option value="client">Clientes</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Tabla de usuarios */}
      <motion.div 
        className="bg-white shadow-md rounded-lg overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead className="text-xs font-semibold uppercase text-gray-500 bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Usuario</div>
                </th>
                <th className="px-4 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Email</div>
                </th>
                <th className="px-4 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Rol</div>
                </th>
                <th className="px-4 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Estado</div>
                </th>
                <th className="px-4 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Último acceso</div>
                </th>
                <th className="px-4 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Registro</div>
                </th>
                <th className="px-4 py-3 whitespace-nowrap">
                  <div className="font-semibold text-center">Acciones</div>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-200">
              {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                  <motion.tr 
                    key={user.id}
                    variants={itemVariants}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                          <div className="rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-semibold text-sm h-full">
                            {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </div>
                        </div>
                        <div className="font-medium text-gray-800">{user.name}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-left">{user.email}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-left">{getRoleBadge(user.role)}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-left">{getStatusBadge(user.status)}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-left font-medium text-gray-500">
                        {user.lastLogin ? user.lastLogin : 'Nunca'}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-left font-medium text-gray-500">{user.registeredDate}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-center space-x-1">
                        <button 
                          className="text-blue-600 hover:text-blue-900 p-1"
                          onClick={() => handleEditUser(user)}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                          </svg>
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-900 p-1"
                          onClick={() => handleDeleteConfirm(user)}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-4 py-6 text-center text-gray-500">
                    No se encontraron usuarios con los criterios de búsqueda
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Modal de edición de usuario */}
      {editingUser && (
        <div className="fixed z-50 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <motion.div 
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      {editingUser.id ? 'Editar Usuario' : 'Nuevo Usuario'}
                    </h3>
                    <div className="mt-4 space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre completo</label>
                        <input
                          type="text"
                          id="name"
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                          value={editingUser.name}
                          onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                          type="email"
                          id="email"
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                          value={editingUser.email}
                          onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                        />
                      </div>
                      <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Rol</label>
                        <select
                          id="role"
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                          value={editingUser.role}
                          onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
                        >
                          <option value="client">Cliente</option>
                          <option value="affiliate">Afiliado</option>
                          <option value="editor">Editor</option>
                          <option value="admin">Administrador</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Estado</label>
                        <select
                          id="status"
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                          value={editingUser.status}
                          onChange={(e) => setEditingUser({...editingUser, status: e.target.value})}
                        >
                          <option value="active">Activo</option>
                          <option value="inactive">Inactivo</option>
                          <option value="pending">Pendiente</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleSaveUser}
                >
                  Guardar
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleCancelEdit}
                >
                  Cancelar
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Modal de confirmación de eliminación */}
      {userToDelete && (
        <div className="fixed z-50 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <motion.div 
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Eliminar usuario
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        ¿Está seguro de que desea eliminar al usuario <span className="font-medium">{userToDelete.name}</span>? Esta acción no se puede deshacer.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleDeleteUser}
                >
                  Eliminar
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleCancelDelete}
                >
                  Cancelar
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
