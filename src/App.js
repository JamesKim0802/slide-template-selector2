import React, { useState, useEffect } from 'react';
import TemplateCreator from './components/TemplateCreator';
import Preview from './components/Preview';
import './App.css';
import axios from 'axios';

function App() {
  const [templates, setTemplates] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('표지');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showCategories, setShowCategories] = useState(false);
  const [whiteButtons, setWhiteButtons] = useState([null, null, null, null, null]);
  const [selectedWhiteButton, setSelectedWhiteButton] = useState(null);
  const [isToolbarVisible, setIsToolbarVisible] = useState(true);

  useEffect(() => {
    fetch(`/templates/${selectedCategory}/templates.json`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched templates:', data);
        setTemplates(data);
        setSelectedTemplate(null); // 카테고리 변경 시 미리보기 이미지 초기화
      })
      .catch(error => console.error('Error fetching templates:', error));
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    console.log('Selected template:', template); // 로그 추가
  };

  const handleCreateTemplate = (newTemplate) => {
    setTemplates([...templates, newTemplate]);
    setSelectedTemplate(newTemplate);
  };

  const handleMergeTemplates = async () => {
    try {
      const filesToMerge = whiteButtons.filter(file => file !== null);
      console.log('Files to merge:', filesToMerge);

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
      console.error('Error merging templates:', error);
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
        newWhiteButtons[emptyIndex] = `/templates/${selectedCategory}/${selectedTemplate.file}`;
        setWhiteButtons(newWhiteButtons);
        setSelectedTemplate(null); // 미리 보기 이미지를 지움
        console.log('Selected template for white buttons:', newWhiteButtons[emptyIndex]); // 로그 추가
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
                <option value="표지">표지</option>
                <option value="개요">개요</option>
                <option value="메인장표">메인장표</option>
                <option value="도식화">도식화</option>
                <option value="요약">요약</option>
              </select>
            </div>
            <div className="template-buttons-group">
              {templates.map((template, index) => (
                <div key={index} className="template-button">
                  <div className="template-image-container">
                    {console.log('Image path:', `/templates/${selectedCategory}/${template.file}`)}
                    <img src={`/templates/${selectedCategory}/${template.file}`} alt={template.name} />
                  </div>
                  <button className="like-button" onClick={() => handleTemplateSelect(template)}>
                    Select
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
              <option value="표지">표지</option>
              <option value="개요">개요</option>
              <option value="메인장표">메인장표</option>
              <option value="도식화">도식화</option>
              <option value="요약">요약</option>
            </select>
            {showCategories && (
              <div className="categories">
                {['표지', '개요', '메인장표', '도식화', '요약'].map((category) => (
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
            {selectedTemplate && <Preview template={{...selectedTemplate, file: `${selectedCategory}/${selectedTemplate.file}`}} />}
          </div>
          <button className="select-button" onClick={handleSelect}>select</button>
          <div className="dotted-line"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
