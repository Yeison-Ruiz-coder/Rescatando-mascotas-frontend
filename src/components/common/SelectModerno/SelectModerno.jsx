import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './SelectModerno.css';

const SelectModerno = ({
  options = [],
  value = [],
  onChange,
  placeholder = 'Seleccionar...',
  label,
  required = false,
  isMulti = true,
  disabled = false,
  error,
  helpText,
  maxSelected = null
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0, width: 0 });
  const containerRef = useRef(null);
  const controlRef = useRef(null);
  const searchInputRef = useRef(null);

  const updateMenuPosition = () => {
    if (controlRef.current) {
      const rect = controlRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      updateMenuPosition();
      window.addEventListener('scroll', updateMenuPosition);
      window.addEventListener('resize', updateMenuPosition);
      
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 100);
    }
    return () => {
      window.removeEventListener('scroll', updateMenuPosition);
      window.removeEventListener('resize', updateMenuPosition);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && 
          containerRef.current && 
          !containerRef.current.contains(event.target) &&
          !event.target.closest('.select-moderno-menu-portal')) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const selectedOptions = options.filter(opt => value.includes(opt.value));
  const filteredOptions = options.filter(opt =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !value.includes(opt.value)
  );

  const handleSelect = (option) => {
    if (!isMulti) {
      onChange([option.value]);
      setIsOpen(false);
      setSearchTerm('');
      return;
    }

    if (maxSelected && value.length >= maxSelected) {
      alert(`Solo puedes seleccionar hasta ${maxSelected} opciones`);
      return;
    }

    onChange([...value, option.value]);
    setSearchTerm('');
  };

  const handleRemove = (optionValue, e) => {
    e.stopPropagation();
    onChange(value.filter(v => v !== optionValue));
  };

  const renderMenu = () => {
    if (!isOpen || disabled) return null;

    return ReactDOM.createPortal(
      <div 
        className="select-moderno-menu-portal"
        style={{
          position: 'absolute',
          top: menuPosition.top,
          left: menuPosition.left,
          width: menuPosition.width,
          zIndex: 999999,
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          maxHeight: '300px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid #e2e8f0'
        }}
      >
        <div className="select-moderno-search">
          <i className="fas fa-search"></i>
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
        <div className="select-moderno-options" style={{ overflowY: 'auto', padding: '0.5rem' }}>
          {filteredOptions.length > 0 ? (
            filteredOptions.map(option => (
              <div
                key={option.value}
                className="select-moderno-option"
                onClick={() => handleSelect(option)}
                style={{
                  padding: '0.8rem 1rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.95rem',
                  color: '#2d3748'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #f0f5ff, #e6edff)';
                  e.currentTarget.style.color = '#667eea';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#2d3748';
                }}
              >
                {option.label}
                {option.subLabel && (
                  <span style={{ fontSize: '0.8rem', color: '#a0aec0' }}>{option.subLabel}</span>
                )}
              </div>
            ))
          ) : (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#a0aec0' }}>
              {searchTerm ? 'No hay resultados' : 'No hay opciones disponibles'}
            </div>
          )}
        </div>
      </div>,
      document.body
    );
  };

  return (
    <div className="select-moderno-container" ref={containerRef}>
      {label && (
        <label className="select-moderno-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}

      <div 
        ref={controlRef}
        className={`select-moderno-control ${isOpen ? 'is-open' : ''} ${disabled ? 'is-disabled' : ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <div className="select-moderno-value-container">
          {selectedOptions.length > 0 ? (
            <div className="selected-chips">
              {selectedOptions.map(opt => (
                <span key={opt.value} className="chip">
                  {opt.label}
                  <button
                    type="button"
                    className="chip-remove"
                    onClick={(e) => handleRemove(opt.value, e)}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </span>
              ))}
            </div>
          ) : (
            <span className="select-moderno-placeholder">{placeholder}</span>
          )}
        </div>
        <div className="select-moderno-indicators">
          <span className={`dropdown-indicator ${isOpen ? 'open' : ''}`}>
            <i className="fas fa-chevron-down"></i>
          </span>
        </div>
      </div>

      {renderMenu()}

      {helpText && <div className="select-moderno-help">{helpText}</div>}
      {error && <div className="select-moderno-error">{error}</div>}
    </div>
  );
};

export default SelectModerno;