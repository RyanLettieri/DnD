import React from 'react';

const Card = ({ children, className = "" }) => (
  <div className={`sheet-panel tab-sheet-panel p-5 ${className}`}>
    {children}
  </div>
);

Card.Header = ({ children }) => (
  <div className="tab-sheet-header">
    <h2 className="sheet-title">{children}</h2>
  </div>
);

Card.Content = ({ children }) => (
  <div className="tab-sheet-content">{children}</div>
);

export default Card;
