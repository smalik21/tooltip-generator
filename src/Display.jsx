import { useEffect, useState } from 'react'
import './Display.css'

const Display = ({ data }) => {

    const { targetElement, position, text, textSize,
            padding, color, backgroundColor, borderRadius,
            tooltipWidth, tooltipHeight, arrowWidth, 
            arrowHeight, image, imageWidth, imageHeight, imageBorderRadius } = data

    const [tooltipStyle, setTooltipStyle] = useState({
        fontSize: `${parseInt(textSize)}px`,
        padding: `${parseInt(padding)}px`,
        color: color,
        backgroundColor: backgroundColor,
        borderRadius: `${parseInt(borderRadius)}px`,
        width: `${parseInt(tooltipWidth)}rem`,
        height: `${parseInt(tooltipHeight)}rem`,
    })

    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
      if (image instanceof Blob) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageSrc(reader.result);
        };
        reader.readAsDataURL(image);
      } else {
        setImageSrc(null);
      }
    }, [image]);
  
  
    useEffect(() => {
        setTooltipStyle({
            fontSize: `${parseInt(textSize)}px`,
            padding: `${parseInt(padding)}px`,
            color: color,
            backgroundColor: backgroundColor,
            borderRadius: `${parseInt(borderRadius)}px`,
            width: `${parseInt(tooltipWidth)}rem`,
            height: `${parseInt(tooltipHeight)}rem`,
        })
    }, [data])

    const buttons = [
        { value: 'Button1', position: 'top-left' },
        { value: 'Button2', position: 'top-right' },
        { value: 'Button3', position: 'center' },
        { value: 'Button4', position: 'bottom-left' },
        { value: 'Button5', position: 'bottom-right' }
    ]

    // Function to calculate arrow direction based on button and position
    const getArrowDirection = (button, position) => {
        switch (position) {
            case 'Top':
                if (button === 'Button1' || button == 'Button2') return 'Top';
                else return 'Bottom';
            case 'Bottom':
                if (button === 'Button4' || button === 'Button5') return 'Bottom';
                else return 'Top';
            case 'Left':
                if (button === 'Button1' || button === 'Button4') return 'Left';
                else return 'Right';
            case 'Right':
                if (button === 'Button2' || button === 'Button5') return 'Right';
                else return 'Left';
            default:
                return 'Bottom'; // Default to pointing downwards
        }
    };

    // Get the arrow direction based on the button and position
    const arrowDirection = getArrowDirection(targetElement, position)


    return (
        <div className="Display">
            <div className='mobile-screen'>

                {buttons.map((input, idx) => {
                    return (
                        <div
                            className={`buttons ${input.position}`}
                            key={idx}
                        >
                            <button>{input.value}</button>
                            {targetElement === input.value && (
                                <span
                                    className='tooltip'
                                    position={position}
                                    button={input.value}
                                    arrowDirection={arrowDirection}
                                    style={{
                                        '--arrow-width': `${arrowWidth}px`, // Set the width of the arrow dynamically
                                        '--arrow-height': `${arrowHeight}px`, // Set the height of the arrow dynamically
                                        '--arrow-direction': arrowDirection, // Set the arrow direction dynamically
                                        '--arrow-background': backgroundColor,
                                        ...tooltipStyle // Include other styles from tooltipStyle object
                                    }}
                                >   
                                    {imageSrc && (
                                        <img
                                            className="tooltip-image"
                                            src={imageSrc}
                                            alt="Tooltip Image"
                                            style={{ 
                                                width: `${imageWidth}px`, 
                                                height: `${imageHeight}px`,
                                                borderRadius: `${imageBorderRadius}px`
                                            }}
                                        />
                                    )}
                                    <span className="tooltip-arrow"></span>
                                    {text}
                                </span>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Display