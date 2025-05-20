// src/contexts/AssetContext.jsx
import { createContext, useContext, useState } from "react";

const AssetContext = createContext();

export const AssetProvider = ({ children }) => {
  const [myAssets, setMyAssets] = useState([]);

  const addAsset = (asset) => {
    setMyAssets((prev) =>
      prev.find((item) => item.id === asset.id) ? prev : [...prev, asset]
    );
  };

  const removeAsset = (assetId) => {
    setMyAssets((prev) => prev.filter((asset) => asset.id !== assetId));
  };

  return (
    <AssetContext.Provider value={{ myAssets, addAsset, removeAsset }}>
      {children}
    </AssetContext.Provider>
  );
};

export const useAsset = () => useContext(AssetContext);
