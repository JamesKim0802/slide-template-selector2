import React, { useState, useEffect } from 'react';
import TemplateCreator from './components/TemplateCreator';
import Preview from './components/Preview';
import './App.css';
import axios from 'axios';

function App() {
  const [templates, setTemplates] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Total');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showCategories, setShowCategories] = useState(false);
  const [whiteButtons, setWhiteButtons] = useState([null, null, null, null, null]);
  const [selectedWhiteButton, setSelectedWhiteButton] = useState(null);
  const [isToolbarVisible, setIsToolbarVisible] = useState(true);

  useEffect(() => {
    fetch(`/templates/${selectedCategory.toLowerCase()}/templates.json`)
      .then(response => response.json())
      .then(data => setTemplates(data))
      .catch(error => console.error('Error fetching templates:', error));
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };

  const handleCreateTemplate = (newTemplate) => {
    setTemplates([...templates, newTemplate]);
    setSelectedTemplate(newTemplate);
  };

  const handleMergeTemplates = async () => {
    try {
      const filesToMerge = whiteButtons.filter(file => file !== null);
      console.log('Files to merge:', filesToMerge); // 로그 추가

      const response = await axios.post('http://localhost:5000/merge', { files: filesToMerge }, {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'merged.pptx');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error merging templates:', error); // 오류 로그 추가
    }
  };

  const handleDropdownChange = (event) => {
    const value = event.target.value;
    setSelectedCategory(value);
  };

  const handleSelect = () => {
    if (selectedTemplate) {
      const newWhiteButtons = [...whiteButtons];
      const emptyIndex = newWhiteButtons.findIndex(button => button === null);
      if (emptyIndex !== -1) {
        newWhiteButtons[emptyIndex] = selectedTemplate.file;
        setWhiteButtons(newWhiteButtons);
        setSelectedTemplate(null); // Clear the preview box
      }
    }
  };

  const handleWhiteButtonClick = (index) => {
    setSelectedWhiteButton(index);
  };

  const handleDelete = () => {
    if (selectedWhiteButton !== null) {
      const newWhiteButtons = whiteButtons.filter((_, i) => i !== selectedWhiteButton);
      newWhiteButtons.push(null);
      setWhiteButtons(newWhiteButtons);
      setSelectedWhiteButton(null);
    }
  };

  const toggleToolbar = () => {
    setIsToolbarVisible(!isToolbarVisible);
  };

  return (
    <div className={`App ${!isToolbarVisible ? 'toolbar-hidden' : ''}`}>
      <div className="toolbar">
        <button className="toggle-button" onClick={toggleToolbar}>
          {isToolbarVisible ? '◀' : '▶'}
        </button>
        {isToolbarVisible && (
          <>
            <div className="dropdown-container">
              <select className="dropdown" onChange={handleDropdownChange} value={selectedCategory}>
                <option value="Total">Total</option>
                <option value="VM">VM</option>
                <option value="CM">CM</option>
                <option value="New project">New project</option>
                <option value="Overhaul">Overhaul</option>
              </select>
            </div>
            <div className="template-buttons-group">
              {templates.map((template, index) => (
                <div key={index} className="template-button">
                  <div className="template-image-container">
                    <img src={template.file} alt={template.name} />
                  </div>
                  <button className="like-button" onClick={() => handleTemplateSelect(template)}>
                    like it
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="main-content">
        <div className="header">
          <div className="top-buttons">
            <button className="template-create-button" onClick={() => setShowDropdown(!showDropdown)}>Template</button>
            <button className="create-button" onClick={handleMergeTemplates}>merge</button>
            <button className="delete-button" onClick={handleDelete}>delete</button>
          </div>
          {showDropdown && <TemplateCreator onCreate={handleCreateTemplate} />}
          <div className="controls">
            <select onChange={handleDropdownChange}>
              <option value="Total">Total</option>
              <option value="VM">VM</option>
              <option value="CM">CM</option>
              <option value="New project">New project</option>
              <option value="Overhaul">Overhaul</option>
            </select>
            {showCategories && (
              <div className="categories">
                {['Total', 'VM', 'CM', 'New project', 'Overhaul'].map((category) => (
                  <button key={category} onClick={() => handleCategoryClick(category)}>{category}</button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="preview-section">
          <div className="solid-line"></div>
          <div className="white-buttons">
            {whiteButtons.map((file, index) => (
              <div 
                key={index} 
                className={`white-button ${selectedWhiteButton === index ? 'selected' : ''}`} 
                onClick={() => handleWhiteButtonClick(index)}
              >
                {file && <img src={file} alt={`Selected ${index}`} />}
              </div>
            ))}
          </div>
          <div className="solid-line"></div>
          <button className="preview-button">preview</button>
          <div className="preview-box">
            {selectedTemplate && <Preview template={selectedTemplate} />}
          </div>
          <button className="select-button" onClick={handleSelect}>select</button>
          <div className="dotted-line"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
