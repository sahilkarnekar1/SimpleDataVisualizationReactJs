import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';

const FileUpload = ({ onDataLoaded }) => {
  const [fileName, setFileName] = useState('');

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target.result;

      if (file.type === 'application/json') {
        const jsonData = JSON.parse(data);
        onDataLoaded(jsonData);
      } else if (file.type === 'text/csv') {
        Papa.parse(data, {
          header: true,
          complete: (results) => {
            onDataLoaded(results.data);
          },
        });
      } else {
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        onDataLoaded(jsonData);
      }
    };

    if (file.type === 'application/json' || file.type === 'text/csv') {
      reader.readAsText(file);
    } else {
      reader.readAsBinaryString(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps({ className: 'dropzone p-3 border rounded' })}>
      <input {...getInputProps()} />
      <p>You Can Provide JSON, CSV, EXCEL file as a input</p>
      <p>Drag & drop a file here, or click to <button className="btn btn-primary btn-sm">select</button> a file</p>
      {fileName && <p>Uploaded: {fileName}</p>}
    </div>
  );
};

export default FileUpload;
