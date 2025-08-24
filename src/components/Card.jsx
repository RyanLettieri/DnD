import React from 'react';

const Card = ({ children, className = "" }) => (
  <div className={`parchment-card-enhanced rounded-lg shadow-lg ${className}`}>
    {children}
  </div>
);

Card.Header = ({ children }) => (
  <div className="px-6 py-4 border-b border-artificerBronze/20">
    <h2 className="text-xl font-bold parchment-text medieval-header">{children}</h2>
  </div>
);

Card.Content = ({ children }) => (
  <div className="space-y-4 paper-grain">{children}</div>
);

export default Card;