import React from 'react';
import Hero from '../../components/Hero';
import Services from '../../components/Services';
import Testimonials from '../../components/Testimonials';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <div className="py-20">
        <Services />
      </div>
      <div className="py-16 bg-gray-50">
        <Testimonials />
      </div>
    </div>
  );
};

export default HomePage;
