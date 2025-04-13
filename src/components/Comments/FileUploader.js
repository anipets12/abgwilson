import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaUpload, FaFile, FaImage, FaTimes } from 'react-icons/fa';
import { supabase } from '../../config/supabase';
const FileUploader = ({ onFileUpload }) => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const onDrop = useCallback(acceptedFiles => {
        setFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
            'application/pdf': ['.pdf'],
            'application/msword': ['.doc'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
        },
        maxSize: 5242880, // 5MB
        maxFiles: 3
    });
    const removeFile = (index) => {
        setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    };
    const uploadFiles = async () => {
        if (files.length === 0)
            return;
        setLoading(true);
        setError(null);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                throw new Error('Debe iniciar sesión para subir archivos');
            }
            const uploadedFiles = [];
            for (const file of files) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
                const filePath = `${user.id}/${fileName}`;
                const { data, error: uploadError } = await supabase.storage
                    .from('attachments')
                    .upload(filePath, file);
                if (uploadError)
                    throw uploadError;
                const { data: publicUrl } = supabase.storage
                    .from('attachments')
                    .getPublicUrl(filePath);
                uploadedFiles.push({
                    name: file.name,
                    url: publicUrl.publicUrl,
                    type: file.type,
                    size: file.size
                });
            }
            onFileUpload(uploadedFiles);
            setFiles([]);
        }
        catch (err) {
            setError(err.message);
        }
        finally {
            setLoading(false);
        }
    };
    const getFileIcon = (file) => {
        if (file.type.startsWith('image/')) {
            return _jsx(FaImage, { className: "text-green-500" });
        }
        return _jsx(FaFile, { className: "text-blue-500" });
    };
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { ...getRootProps(), className: `border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`, children: [_jsx("input", { ...getInputProps() }), _jsx(FaUpload, { className: "mx-auto text-2xl text-gray-400 mb-2" }), _jsx("p", { className: "text-gray-600", children: isDragActive
                            ? 'Suelte los archivos aquí...'
                            : 'Arrastre y suelte archivos aquí, o haga clic para seleccionar archivos' }), _jsx("p", { className: "text-xs text-gray-500 mt-1", children: "M\u00E1ximo 3 archivos (JPG, PNG, PDF, DOC, DOCX) de hasta 5MB cada uno" })] }), files.length > 0 && (_jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "font-medium", children: "Archivos seleccionados:" }), _jsx("ul", { className: "space-y-2", children: files.map((file, index) => (_jsxs("li", { className: "flex items-center justify-between bg-gray-50 p-2 rounded-md", children: [_jsxs("div", { className: "flex items-center", children: [getFileIcon(file), _jsx("span", { className: "ml-2", children: file.name }), _jsxs("span", { className: "ml-2 text-xs text-gray-500", children: ["(", (file.size / 1024).toFixed(1), " KB)"] })] }), _jsx("button", { type: "button", onClick: () => removeFile(index), className: "text-red-500 hover:text-red-700", children: _jsx(FaTimes, {}) })] }, index))) }), _jsx("button", { type: "button", onClick: uploadFiles, disabled: loading, className: "bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50", children: loading ? 'Subiendo...' : 'Subir archivos' })] })), error && _jsx("div", { className: "text-red-500", children: error })] }));
};
export default FileUploader;
