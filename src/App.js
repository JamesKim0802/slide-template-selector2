import React, { useState, useEffect } from 'react';
import TemplateCreator from './components/TemplateCreator';
import Preview from './components/Preview';
import './App.css';

function App() {
  const [templates, setTemplates] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Total');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showCategories, setShowCategories] = useState(false);
  const [buttonWidth, setButtonWidth] = useState(300);
  const [buttonHeight, setButtonHeight] = useState(400);
  const [whiteButtons, setWhiteButtons] = useState([null, null, null, null, null]);
  const [selectedWhiteButton, setSelectedWhiteButton] = useState(null);

  useEffect(() => {
    fetch('/templates/templates.json')
      .then(response => response.json())
      .then(data => setTemplates(data))
      .catch(error => console.error('Error fetching templates:', error));
  }, []);

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

  const handleMergeTemplates = () => {
    alert('Template release.');
  };

  const handleDropdownChange = (event) => {
    const value = event.target.value;
    setShowCategories(!!value);
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

  return (
    <div className="App">
      <div className="header">
        <div className="top-buttons">
          <button className="template-create-button" onClick={() => setShowDropdown(!showDropdown)}>Template</button>
          <button className="create-button" onClick={handleMergeTemplates}>merge</button>
          <button className="delete-button" onClick={handleDelete}>delete</button>
        </div>
        {showDropdown && <TemplateCreator onCreate={handleCreateTemplate} />}
        <div className="controls">
          <select onChange={handleDropdownChange}>
            <option value="">Select</option>
            <option value="Basic layout">Basic layout</option>
            <option value="Index">Index</option>
            <option value="summary">summary</option>
            <option value="main slide">main slide</option>
          </select>
          {showCategories && (
            <div className="categories">
              {['Total', 'VM', 'CM', 'New project', 'O/H'].map((category) => (
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
        <div className="template-buttons-group">
          <div className="template-buttons">
            {templates.slice(0, 4).map((template, index) => (
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
          <div className="template-buttons">
            {templates.slice(4).map((template, index) => (
              <div key={index + 4} className="template-button">
                <div className="template-image-container">
                  <img src={template.file} alt={template.name} />
                </div>
                <button className="like-button" onClick={() => handleTemplateSelect(template)}>
                  like it
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
