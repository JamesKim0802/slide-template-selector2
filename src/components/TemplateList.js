import React, { useState } from 'react';

const TemplateList = ({ onSelectTemplate }) => {
  const templates = [
    'Template 1', 'Template 2', 'Template 3', 'Template 4', 'Template 5',
    'Template 6', 'Template 7', 'Template 8', 'Template 9', 'Template 10',
    'Template 11', 'Template 12'
  ];

  return (
    <div className="template-buttons">
      {templates.map((template, index) => (
        <button key={index} onClick={() => onSelectTemplate(template)}>{template}</button>
      ))}
    </div>
  );
};

export default TemplateList;
