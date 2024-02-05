// Canvas.js

import React from 'react';

const Canvas = ({ assets, onDrop, getAssetSource, setAssets }) => {
  const handleDrop = (event) => {
    event.preventDefault();
    const assetType = event.dataTransfer.getData('text/plain');
    const canvasRect = event.currentTarget.getBoundingClientRect();
    const position = {
      x: event.clientX - canvasRect.left,
      y: event.clientY - canvasRect.top,
    };

    onDrop(assetType, position);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };


  return (
    <div 
      id='pdfId'
      className="canvas-container"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {assets.map((asset, index) => (
        <div
          key={index}
          className={`canvas-asset ${asset.resizable ? 'resizable' : ''}`}
          style={{
            transform: `translate(${asset.position.x - (asset.size?.width || 100) / 2}px, ${asset.position.y - (asset.size?.height || 100) / 2}px)`,
            width: `${asset.size?.width || 100}px`,
            height: `${asset.size?.height || 100}px`,
            position: 'absolute',
          }}
        >
          <img src={getAssetSource(asset.type)} alt={asset.type} style={{ width: '100%', height: '100%' }} />
        </div>
      ))}
    </div>
  );
};

export default Canvas;
