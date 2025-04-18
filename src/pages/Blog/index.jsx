import React from 'react';
import Blog from '../../components/Blog';

const BlogPage = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Blog Legal</h1>
        <p className="text-lg text-center max-w-3xl mx-auto mb-16">
          Manténgase informado sobre temas legales relevantes, cambios en la legislación ecuatoriana y consejos prácticos para diversas situaciones jurídicas.
        </p>
        <Blog />
      </div>
    </div>
  );
};

export default BlogPage;
