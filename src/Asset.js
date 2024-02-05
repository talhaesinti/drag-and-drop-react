// Asset.js
import React from 'react';
import './styles/Asset.css';

const Asset = ({ type, getAssetSource }) => {
  const handleDragStart = (event) => {
    event.dataTransfer.setData('text/plain', type);
  };

  return (
    <div
      className="resizable-asset"
      draggable
      onDragStart={handleDragStart}
      style={{ width: '100px', height: '100px' }}
    >
      <img
        src={getAssetSource(type)}
        alt={type}
        style={{ maxWidth: '100%', maxHeight: '100%' }}
      />
    </div>
  );
};

export default Asset;