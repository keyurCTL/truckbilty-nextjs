// src/components/Loader.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import Lottie from 'lottie-react';
import loader from '../../../public/animations/loader.json';

// Loader Component
const Loader: React.FC = () => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-transparent z-99998">
      <Lottie animationData={loader} autoPlay={true} />
    </div>,
    document.body
  );
};

export default Loader;
