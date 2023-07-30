import './InputBox.css'

const InputBox = ({name, label, sub, placeholder, value, size, onChange}) => {

    const handleChange = (event) => {
        event.preventDefault()

        const {name, value} = event.target
        onChange(name, value)
    }

    return (
        <div className={`input-box ${size}`}>
            <label>{label} <span>{sub}</span></label>
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