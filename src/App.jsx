import { useState, useEffect } from 'react'
import './App.css'
import DropdownMenu from './DropdownMenu'
import RadioButton from './RadioButton'
import InputBox from './InputBox'
import Display from './Display'


function App() {

  const [tooltipData, setTooltipData] = useState({
    targetElement: 'Button3',
    position: 'Bottom',
    text: 'Tooltip text goes here',
    textSize: '14',
    padding: '2',
    color: '#fff',
    backgroundColor: '#000',
    borderRadius: '5',
    tooltipWidth: '9',
    tooltipHeight: '2',
    arrowWidth: '5',
    arrowHeight: '5',
    image: null,
    imageWidth: '30',
    imageHeight: '20',
    imageBorderRadius: '4'
  })

  const [loading, setLoading] = useState(true);
  const [loadedFromLocalStorage, setLoadedFromLocalStorage] = useState(false);

  useEffect(() => {
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
    setLoading(false); 
  }, []);

  useEffect(() => {
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

  const inputConfigs = [
    { label: 'Tooltip Text', name: 'text', placeholder: 'enter tooltip text here', value: tooltipData.text, size: 'full' },
    { label: 'Text Size', sub: '( in px )', name: 'textSize', placeholder: 'text size', value: tooltipData.textSize, size: 'half' },
    { label: 'Padding', sub: '( in px )', name: 'padding', placeholder: 'padding', value: tooltipData.padding, size: 'half' },
    { label: 'Text Colour', name: 'color', placeholder: 'text colour', value: tooltipData.color, size: 'full' },
    { label: 'Background Colour', name: 'backgroundColor', placeholder: 'background colour', value: tooltipData.backgroundColor, size: 'full' },
    { label: 'Tooltip Width', sub: '( in rem )', name: 'tooltipWidth', placeholder: 'tooltip width', value: tooltipData.tooltipWidth, size: 'half' },
    { label: 'Tooltip Height', sub: '( in rem )', name: 'tooltipHeight', placeholder: 'tooltip height', value: tooltipData.tooltipHeight, size: 'half' },
    { label: 'Arrow Width', sub: '( in px )', name: 'arrowWidth', placeholder: 'arrow width', value: tooltipData.arrowWidth, size: 'half' },
    { label: 'Arrow Height', sub: '( in px )', name: 'arrowHeight', placeholder: 'arrow height', value: tooltipData.arrowHeight, size: 'half' },
    { label: 'Corner Radius', sub: '( in px )', name: 'borderRadius', placeholder: 'corner radius', value: tooltipData.borderRadius, size: 'half' }

  ]

  const imageInputs = [
    { label: 'Image Width', sub: '( in px )', name: 'imageWidth', placeholder: 'image width', value: tooltipData.imageWidth, size: 'half' },
    { label: 'Image Height', sub: '( in px )', name: 'imageHeight', placeholder: 'image height', value: tooltipData.imageHeight, size: 'half' },
    { label: 'Border Radius', sub: '( in px )', name: 'imageBorderRadius', placeholder: 'border radius', value: tooltipData.imageBorderRadius, size: 'half' }
  ]

  if (loading) {
    return null; 
  }

  return (
    <div className='App'>
      <form>
      <DropdownMenu
            name='targetElement'
            label='Target Element'
            options={targetOptions}
            value={tooltipData.targetElement}
            onSelect={handleTooltipChange}    
          />

      <RadioButton
        name='position'
        options={positionOptions}
        value={tooltipData.position}
        onSelect={handleTooltipChange}
      />

      {inputConfigs.map((input, idx) => {
        return (
          <InputBox
            key={idx}
            name={input.name}
            label={input.label}
            sub={input.sub}
            placeholder={input.placeholder}
            value={input.value}
            size={input.size}
            onChange={handleTooltipChange}   
          />
        )
      })}
      
      <label className='image-input-wrapper'>
        <span className='image-input-label'>Insert Image in Tooltip</span>
        <input
          className='image-input'
          type='file'
          onChange={(e) => handleTooltipChange('image', e.target.files[0])}
        />
      </label>

      {tooltipData.image && (
        imageInputs.map((input, idx) => (
          <InputBox
            key={idx}
            name={input.name}
            label={input.label}
            sub={input.sub}
            placeholder={input.placeholder}
            value={input.value}
            size={input.size}
            onChange={handleTooltipChange}
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