// src/utils.js
export const detectVariableTypes = (data) => {
    const types = {};
    const firstRow = data[0];
  
    Object.keys(firstRow).forEach((key) => {
      const value = firstRow[key];
      if (!isNaN(value) && value !== null && value !== "") {
        types[key] = 'number';
      } else {
        types[key] = 'string';
      }
    });
  
    return types;
  };
  