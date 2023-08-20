import React, { useState, useEffect } from 'react'
import buttonDatai from './buttonData';
import './Landing.css'
const Landing = () => {
    const [tooltipContent, setTooltipContent] = useState('');
    const [selectedButtonId, setSelectedButtonId] = useState('button-1');
    const [showToolkitText, setShowToolkitText] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState('below');
    const [buttonData, setButtonData] = useState(buttonDatai);

    const handleFieldChange = (buttonId, field, value) => {
        const updatedButtonData = buttonData.map((item) =>
            item.id === buttonId ? { ...item, [field]: value } : item
        );
        setButtonData(updatedButtonData);
    };
    const handleImageUpload = (buttonId, file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
            const image = e.target.result;
            const updatedButtonData = buttonData.map((button) =>
                button.id === buttonId ? { ...button, image } : button
            );

            setButtonData(updatedButtonData);
            localStorage.setItem('buttonData', JSON.stringify(updatedButtonData));
        };

        reader.readAsDataURL(file);
    };
console.log(buttonData)
    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem('buttonData')) || [];
        if (savedData.length > 0) {
            setButtonData(savedData);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('buttonData', JSON.stringify(buttonData));
    }, [buttonData]);



    const handleButtonMouseEnter = (buttonId) => {
        setShowToolkitText(true);
    
        console.log(buttonId);
        setTimeout(() => {
            const buttonElement = document.querySelector(`.${buttonId}`);
            const buttonRect = buttonElement.getBoundingClientRect();
            const tooltipHeight = buttonRect.height; 
            const tooltipWidth = buttonRect.width;   
    
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;
    
            const availableSpace = {
                top: buttonRect.top - tooltipHeight - 10,
                right: screenWidth - buttonRect.right - tooltipWidth - 10,
                bottom: screenHeight - buttonRect.bottom - tooltipHeight - 10,
                left: buttonRect.left - tooltipWidth - 10,
            };
    
            if (screenWidth > 1024) {
                if (availableSpace.bottom >= tooltipHeight) {
                    setTooltipPosition('below');
                } else if (availableSpace.top >= tooltipHeight) {
                    setTooltipPosition('above');
                } 
            } else {
              
                if (availableSpace.bottom >= 10) {
                    setTooltipPosition('below');
                } else {
                    setTooltipPosition('above');
                }
            }
    
            console.log(tooltipPosition)
            setTooltipContent(buttonId);
        }, 0);
    };

    const handleButtonMouseLeave = () => {
        setShowToolkitText(false);
    };



    const handleDropdownChange = (e) => {
        const newSelectedButtonId = e.target.value;
        setSelectedButtonId(newSelectedButtonId);

    }

    const selectedButton = buttonData.find((item) => item.id === selectedButtonId);
    return (
        <div className='landing'>
            <section className='landing-left'>
                <div className='tipify-container'>

                    <div className='tipify-content'>
                        <div className='target-element'>
                            Target Element
                        </div>
                        <select name="button-val" className='button-v' onChange={handleDropdownChange} >
                            {buttonData.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.id}
                                </option>
                            ))}
                        </select>
                        <div className='toolkit-text'>
                            Toolkit text
                        </div>
                        <input
                            type='text'
                            placeholder='Enter content'
                            value={selectedButton.content}
                            onChange={(e) =>
                                handleFieldChange(selectedButton.id, 'content', e.target.value)
                            }
                        />
                        <div className='item-c'>
                            <div className='text-size'>
                                <div className='text-size-t'>
                                    Text Size
                                </div>
                                <input className='text-size-i' placeholder='Enter Number'
                                    value={selectedButton.fontsize}
                                    onChange={(e) =>
                                        handleFieldChange(selectedButton.id, 'fontsize', e.target.value)
                                    } type="number" />
                            </div>
                            <div className='padding'>
                                <div className='padding-t'>
                                    Padding
                                </div>
                                <input className='padding-i' placeholder='Enter Number'
                                    value={selectedButton.padding}
                                    onChange={(e) => handleFieldChange(selectedButton.id, 'padding', e.target.value)}
                                    type="number" min="0" />
                            </div>

                        </div>
                        <div className='text-color-t'>
                            Text Color
                        </div>
                        <input className='text-color' placeholder='Input' type='textbox'
                            value={selectedButton.textColor}
                            onChange={(e) => handleFieldChange(selectedButton.id, 'textColor', e.target.value)}></input>

                        <div className='background-color-t'>
                            Background Color
                        </div>
                        <input className='background-color-i' placeholder='Input' type='textbox'
                            value={selectedButton.backgroundColor}
                            onChange={(e) => handleFieldChange(selectedButton.id, 'backgroundColor', e.target.value)}></input>
                        <div className='item-c'>
                            <div className='corner-radius'>
                                <div className='corner-radius-t'>
                                    Corner Radius
                                </div>
                                <input className='corner-radius-i' placeholder='Enter Number'
                                    onChange={(e) =>
                                        handleFieldChange(selectedButton.id, 'cornerRadius', e.target.value)
                                    }
                                    type="number" min="0" ></input>
                            </div>
                            <div className='tooltip-width'>
                                <div className='tooltip-width-t'>
                                    Tooltip Width
                                </div>
                                <input className='tooltip-width-i' placeholder='Enter Number' type="number" min="0" ></input>
                            </div>
                        </div>
                        <div className='item-c'>
                            <div className='arrow-width'>
                                <div className='arrow-width-t'>
                                    Arrow Width
                                </div>
                                <input className='arrow-width-i' placeholder='Enter Number'
                                    value={selectedButton.arrowWidth}
                                    onChange={(e) => handleFieldChange(selectedButton.id, 'arrowWidth', e.target.value)}
                                    type="number" min="0" ></input>
                            </div>
                            <div className='arrow-height'>
                                <div className='arrow-height-t'>
                                    Arrow Height
                                </div>
                                <input className='arrow-height-i' placeholder='Enter Number'
                                    value={selectedButton.arrowHeight}
                                    onChange={(e) => handleFieldChange(selectedButton.id, 'arrowHeight', e.target.value)}
                                    type="number" min="0" ></input>
                            </div>
                        </div>
                        <div className='img-i'>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(selectedButton.id, e.target.files[0])}
                            />
                        </div>
                    </div>

                </div>
            </section>
            <section className='landing-right'>
                <div className='outer-screen'>
                    <div className='inner-screen'>
                        <div className='inner-screen-item'>
                            {buttonData.map((item) => (
                                <div className='tooltip-container' key={item.id}>
                                    <button
                                        className={`button ${item.id}`}
                                        data-button-id={item.id}
                                        onMouseEnter={() => handleButtonMouseEnter(item.id)}
                                        onMouseLeave={handleButtonMouseLeave}
                                    >
                                        {item.id}
                                    </button>
                                    {tooltipContent === item.id && (
                                        <div className={`tooltip-e  ${tooltipPosition === 'above' ? 'above' : 'below'}`}>
                                            <div className='custom-tooltip' style={selectedButton.id === item.id ?
                                                {
                                                    fontSize: selectedButton.fontsize + 'px',
                                                    padding: selectedButton.padding + 'px',
                                                    color: selectedButton.textColor,
                                                    backgroundColor: selectedButton.backgroundColor,
                                                    borderRadius: selectedButton.cornerRadius + 'px',
                                                    height:"80px"
                                                   

                                                } : {}}>

                                                <div className='tooltip-arrow'
                                                    style={selectedButton.id === item.id ?
                                                        {
                                                            borderLeft: `${selectedButton.arrowWidth}px solid transparent`,
                                                            borderRight: `${selectedButton.arrowWidth}px solid transparent`,
                                                            borderBottom: `${selectedButton.arrowHeight}px solid ${selectedButton.backgroundColor}`,
                                                            top: '-' + selectedButton.arrowHeight + 'px',

                                                        } : {}}></div>
                                                        {item.image===''?<div className='no-flex'> {item.content === '' ? `Your custom tooltip content for ${item.id}` : <div className='content-i'>
                                                    {item.content}
                                                </div>}
                                                </div>:<div className='flex-img'>
                                                    <div className='left-t'>
                                                {selectedButtonId === item.id && item.image && (
                                                    <img className='tooltip-img' src={item.image} alt={`Image for ${item.id}`} />
                                                )}
                                                
                                                </div>
                                                <div className='right-t'>
                                                {item.content === '' ? `Your custom tooltip content for ${item.id}` : <div className='content-i'>
                                                    {item.content}
                                                </div>}
                                                </div>
                                                    </div>}
                                               
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section >
        </div >
    )
}

export default Landing