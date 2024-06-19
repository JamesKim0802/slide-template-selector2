import React from 'react';
import './Preview.css';

function Preview({ template }) {
  return (
    <div className="preview">
      <img src={template.file} alt={template.name} className="preview-image" />
    </div>
  );
}

export default Preview;
