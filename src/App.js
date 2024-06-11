// src/App.js
import React, { useState } from 'react';
import FileUpload from './FileUpload';
import DataPreview from './DataPreview';
import Visualization from './Visualization';
import './styles.css';

const App = () => {
  const [data, setData] = useState([]);

  return (
    <div className="container">
      <h1 className="my-4">Data Visualization Tool</h1>
      <FileUpload onDataLoaded={setData} />
      <h2 className="my-4">Data Preview</h2>
      <DataPreview data={data} />
      <h2 className="my-4">Visualization</h2>
      <Visualization data={data} />
    </div>
  );
};

export default App;
