import { useState, useEffect } from 'react'
import './App.css'
import DropdownMenu from './DropdownMenu'
import InputBox from './InputBox'
import Display from './Display'

function App() {

  const [tooltipData, setTooltipData] = useState({
    targetElement: 'Button3',
    position: 'Bottom',
    text: 'Tooltip text goes here',
    textSize: '10',
    padding: '0',
    color: '#333',
    backgroundColor: '#f0f0f0',
    borderRadius: '3',
    tooltipWidth: '3',
    tooltipHeight: '2',
    arrowWidth: '3',
    arrowHeight: '3',
    image: null,
    imageWidth: '50',
    imageHeight: '50',
    imageBorderRadius: '4'
  })

  const [loading, setLoading] = useState(true);
  const [loadedFromLocalStorage, setLoadedFromLocalStorage] = useState(false);

  useEffect(() => {
    // Retrieve tooltip data from local storage when the app loads
    const storedTooltipData = localStorage.getItem('tooltipData');
    if (storedTooltipData) {
      try {
        setTooltipData(JSON.parse(storedTooltipData));
        console.log("Loaded Data:", storedTooltipData);
        setLoadedFromLocalStorage(true);
      } catch (error) {
        console.error("Error parsing stored data:", error);
      }
    }
    setLoading(false); // Mark data loading as complete
  }, []);

  useEffect(() => {
    // Store tooltip data in local storage whenever tooltipData changes
    if (loadedFromLocalStorage) {
      localStorage.setItem('tooltipData', JSON.stringify(tooltipData));
    }
  }, [tooltipData, loadedFromLocalStorage]);


  const handleTooltipChange = (name, value) => {
    setTooltipData((prevData) => {
      return {
        ...prevData,
        [name]: value
      }
    })
  }

  const targetOptions = ['Button1', 'Button2', 'Button3', 'Button4', 'Button5']
  const positionOptions = ['Bottom', 'Left', 'Right', 'Top']

  const dropdownConfigs = [
    { label: 'Tooltip Target', name: 'targetElement', options: targetOptions, value: tooltipData.targetElement },
    { label: 'Tooltip Position', name: 'position', options: positionOptions, value: tooltipData.position }
  ]

  const inputConfigs = [
    { label: 'Tooltip Text', name: 'text', placeholder: 'enter tooltip text here', value: tooltipData.text, size: 'full' },
    { label: 'Text Size', name: 'textSize', placeholder: 'text size', value: tooltipData.textSize, size: 'half' },
    { label: 'Padding', name: 'padding', placeholder: 'padding', value: tooltipData.padding, size: 'half' },
    { label: 'Text Colour', name: 'color', placeholder: 'text colour', value: tooltipData.color, size: 'full' },
    { label: 'Background Colour', name: 'backgroundColor', placeholder: 'background colour', value: tooltipData.backgroundColor, size: 'full' },
    { label: 'Corner Radius', name: 'borderRadius', placeholder: 'corner radius', value: tooltipData.borderRadius, size: 'half' },
    { label: 'Tooltip Width', name: 'tooltipWidth', placeholder: 'tooltip width', value: tooltipData.tooltipWidth, size: 'half' },
    { label: 'Tooltip Height', name: 'tooltipHeight', placeholder: 'tooltip height', value: tooltipData.tooltipHeight, size: 'half' },
    { label: 'Arrow Width', name: 'arrowWidth', placeholder: 'arrow width', value: tooltipData.arrowWidth, size: 'half' },
    { label: 'Arrow Height', name: 'arrowHeight', placeholder: 'arrow height', value: tooltipData.arrowHeight, size: 'half' }
  ]

  const imageInputs = [
    { label: 'Image Width', name: 'imageWidth', placeholder: 'image width', value: tooltipData.imageWidth, size: 'half' },
    { label: 'Image Height', name: 'imageHeight', placeholder: 'image height', value: tooltipData.imageHeight, size: 'half' },
    { label: 'Border Radius', name: 'imageBorderRadius', placeholder: 'border radius', value: tooltipData.imageBorderRadius, size: 'half' }
  ]

  if (loading) {
    return null; // Or you can show a loading indicator here
  }

  return (
    <div className='App'>
      <form>
      {dropdownConfigs.map((input, idx) => {
        return (
          <DropdownMenu
            key={idx}
            name={input.name}
            label={input.label}
            options={input.options}
            value={input.value}
            onSelect={handleTooltipChange}    // common for all
          />
        )
      })}

      {inputConfigs.map((input, idx) => {
        return (
          <InputBox
            key={idx}
            name={input.name}
            label={input.label}
            placeholder={input.placeholder}
            value={input.value}
            size={input.size}
            onChange={handleTooltipChange}    // common for all
          />
        )
      })}

      <label>Insert Image in Tooltip</label>
      <input type="file" onChange={(e) => handleTooltipChange('image', e.target.files[0])} />

      {tooltipData.image && (
        imageInputs.map((input, idx) => (
          <InputBox
            key={idx}
            name={input.name}
            label={input.label}
            placeholder={input.placeholder}
            value={input.value}
            size={input.size}
            onChange={handleTooltipChange} // common for all
          />
        ))
      )}
      </form>
    
      <Display
        data={tooltipData}
      />
    </div>
  )
}

export default App