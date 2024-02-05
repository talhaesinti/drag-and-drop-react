// App.js
import React, { useState } from 'react';
import Asset from './Asset';
import Canvas from './Canvas';
import './styles/App.css';
import CanvasToPDF from './CanvasToPDF';

const App = () => {
  const [assets, setAssets] = useState([]);

  const handleDrop = (assetType, position) => {
    const newAsset = { type: assetType, position, resizable: true, size: { width: 100, height: 100 } };
    setAssets((prevAssets) => [...prevAssets, newAsset]);
  };

  const getAssetSource = (assetType) => {
    return process.env.PUBLIC_URL + `/assets/${assetType.toLowerCase()}.svg`;
  };

  const savePositionsToJson = () => {
    const positions = assets.map((asset) => ({
      type: asset.type,
      position: asset.position,
      resizable: asset.resizable,
      size: asset.size,
    }));

    const jsonString = JSON.stringify(positions, null, 2);
    localStorage.setItem('positions.json', jsonString);

    console.log(jsonString);
  };

  const loadPositionsFromJson = () => {
    const jsonString = localStorage.getItem('positions.json');

    if (jsonString) {
      const presentAssets = JSON.parse(jsonString);
      const loadedAssets = presentAssets.map((asset, index) => ({
        type: asset.type,
        position: asset.position,
        resizable: asset.resizable,
        size: asset.size,
      }));

      setAssets(loadedAssets);
    }
  };

  const deleteWorkspace = () => {
    setAssets([]);
  };

  const handleLoadPrevious = () => {
    setAssets([]);
    loadPositionsFromJson();
  };

  return (
    <div className="app-container">
      <div className="assets-panel">
        <h2>Asset Panel</h2>
        <Asset type="Asset1" getAssetSource={getAssetSource} />
        <Asset type="Asset2" getAssetSource={getAssetSource} />
        <Asset type="Asset3" getAssetSource={getAssetSource} />
        <Asset type="Asset4" getAssetSource={getAssetSource} />
      </div>
      <Canvas assets={assets} onDrop={handleDrop} getAssetSource={getAssetSource} setAssets={setAssets} />
      <div className="button-container">
        <button onClick={savePositionsToJson}>Taslağı Kaydet</button>
        <button onClick={handleLoadPrevious}>Önceki Çalışmayı Geri Getir</button>
        <button onClick={deleteWorkspace}>Temizle</button>

        <CanvasToPDF downloadFileName="CustomPdf" rootElementId="pdfId"/>
      </div>
    </div>
  );
};

export default App;
