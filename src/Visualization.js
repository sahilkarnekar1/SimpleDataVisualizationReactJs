import React, { useState, useEffect } from 'react';
import { Bar, Line, Pie, Scatter } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { detectVariableTypes } from './utils'; // adjust the import path as needed

Chart.register(...registerables);

const Visualization = ({ data }) => {
  const [chartType, setChartType] = useState('bar');
  const [xVariable, setXVariable] = useState('');
  const [yVariable, setYVariable] = useState('');
  const [variables, setVariables] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      const variableTypes = detectVariableTypes(data);
      const variableKeys = Object.keys(variableTypes).filter(key => variableTypes[key] === 'number');
      setVariables(variableKeys);
      if (variableKeys.length > 1) {
        setXVariable(variableKeys[0]);
        setYVariable(variableKeys[1]);
      }
    }
  }, [data]);

  const chartData = {
    labels: data.map(row => row[xVariable]),
    datasets: [
      {
        label: yVariable,
        data: data.map(row => row[yVariable]),
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return (
    <div className="container">
      <div className="row mb-3">
        <div className="col">
          <label>X-Axis:</label>
          <select className="form-control" onChange={(e) => setXVariable(e.target.value)} value={xVariable}>
            {variables.map(variable => (
              <option key={variable} value={variable}>
                {variable}
              </option>
            ))}
          </select>
        </div>
        <div className="col">
          <label>Y-Axis:</label>
          <select className="form-control" onChange={(e) => setYVariable(e.target.value)} value={yVariable}>
            {variables.map(variable => (
              <option key={variable} value={variable}>
                {variable}
              </option>
            ))}
          </select>
        </div>
        <div className="col">
          <label>Chart Type:</label>
          <select className="form-control" onChange={(e) => setChartType(e.target.value)} value={chartType}>
            <option value="bar">Bar Chart</option>
            <option value="line">Line Chart</option>
            <option value="pie">Pie Chart</option>
            <option value="scatter">Scatter Plot</option>
          </select>
        </div>
      </div>
      <div>
        {chartType === 'bar' && <Bar data={chartData} />}
        {chartType === 'line' && <Line data={chartData} />}
        {chartType === 'pie' && <Pie data={chartData} />}
        {chartType === 'scatter' && <Scatter data={chartData} />}
      </div>
    </div>
  );
};

export default Visualization;
