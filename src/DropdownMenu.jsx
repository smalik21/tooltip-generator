import React, { useState, useEffect } from 'react'
import './DropdownMenu.css' // Create this CSS file to style the dropdown menu

const DropdownMenu = ({name, options, value, onSelect }) => {

  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)

  useEffect(() => {
    setSelectedOption(value);
  }, [])

  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen)
  }

  const handleOptionSelect = (option) => {
    setSelectedOption(option)
    setIsOpen(false)
    onSelect(name, option) 
  }

  return (
    <div className="dropdown-menu">
      <div className="dropdown-trigger" onClick={toggleDropdown}>
        {selectedOption || 'Select an option'}
      </div>
      {isOpen && (
        <ul className="dropdown-list">
          {options.map((option) => (
            <li key={option} onClick={() => handleOptionSelect(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default DropdownMenu
