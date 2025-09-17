import React from 'react';

const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white dark:bg-neutral-dark rounded-xl shadow-lg p-6 transition-shadow hover:shadow-xl ${className}`}>
      {children}
    </div>
  );
};

export default Card;