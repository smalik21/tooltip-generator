import './RadioButton.css'; 

const RadioButton = ({ name, options, value, onSelect }) => {
  return (
    <div className='RadioButton'>
      {options.map((option) => (
        <label key={option} className='RadioButtonLabel'>
          <input
            type='radio'
            name={name}
            value={option}
            checked={value === option}
            onChange={(e) => onSelect(name, e.target.value)}
            className='RadioButtonInput'
          />
          <span className='RadioButtonCustom'></span>
          {option}
        </label>
      ))}
    </div>
  );
};

export default RadioButton;
