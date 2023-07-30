import './InputBox.css'

const InputBox = ({name, label, placeholder, value, onChange}) => {

    const handleChange = (event) => {
        event.preventDefault()

        const {name, value} = event.target
        onChange(name, value)
    }

    return (
        <div className='input-box'>
            <label>{label}</label>
            <input 
                type='text' 
                name={name}
                placeholder={placeholder} 
                value={value}
                onChange={handleChange}
            />
        </div>
    )
}

export default InputBox