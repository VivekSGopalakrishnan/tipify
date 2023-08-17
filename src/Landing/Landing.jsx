import React, { useState } from 'react'
import './Landing.css'
const Landing = () => {
    const [tooltipContent, setTooltipContent] = useState('');

    const buttonData = [
        'button-1',
        'button-2',
        'button-3',
        'button-4',
        'button-5',
    ];
    const handleButtonMouseEnter = (content) => {
        setTooltipContent(content);
      };
    
      const handleButtonMouseLeave = () => {
        setTooltipContent('');
      };
    
    return (
        <div className='landing'>
            <section className='landing-left'>
                <div className='tipify-container'>
                    <div className='tipify-content'>
                        <div className='target-element'>
                            Target Element
                        </div>
                        <select name="button-val" className='button-v' >
                            <option>button-1</option>
                            <option>button-2</option>
                            <option>button-3</option>
                            <option>button-4</option>
                            <option>button-5</option>
                        </select>
                        <div className='toolkit-text'>
                            Toolkit text
                        </div>
                        <input className='input-text' placeholder='Input' type='textbox'></input>
                        <div className='item-c'>
                            <div className='text-size'>
                                <div className='text-size-t'>
                                    Text Size
                                </div>
                                <input className='text-size-i' placeholder='Enter Number' type="number" min="0" />
                            </div>
                            <div className='padding'>
                                <div className='padding-t'>
                                    Padding
                                </div>
                                <input className='padding-i' placeholder='Enter Number' type="number" min="0" />
                            </div>

                        </div>
                        <div className='text-color-t'>
                            Text Color
                        </div>
                        <input className='text-color' placeholder='Input' type='textbox'></input>

                        <div className='background-color-t'>
                            Background Color
                        </div>
                        <input className='background-color-i' placeholder='Input' type='textbox'></input>
                        <div className='item-c'>
                            <div className='corner-radius'>
                                <div className='corner-radius-t'>
                                    Corner Radius
                                </div>
                                <input className='corner-radius-i' placeholder='Enter Number' type="number" min="0" ></input>
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
                                <input className='arrow-width-i' placeholder='Enter Number' type="number" min="0" ></input>
                            </div>
                            <div className='arrow-height'>
                                <div className='arrow-height-t'>
                                    Arrow Height
                                </div>
                                <input className='arrow-height-i' placeholder='Enter Number' type="number" min="0" ></input>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='landing-right'>
                <div className='outer-screen'>
                    <div className='inner-screen'>
                        <div className='inner-screen-item'>
                            {buttonData.map((buttonId) => (
                                <div className='tooltip-container' key={buttonId}>
                                    <button
                                        className={`button ${buttonId}`}
                                        onMouseEnter={() => handleButtonMouseEnter(buttonId)}
                                        onMouseLeave={handleButtonMouseLeave}
                                    >
                                        {buttonId}
                                    </button>
                                    {tooltipContent === buttonId && (
                                        <div className='custom-tooltip'>
                                            Your custom tooltip content for {buttonId}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Landing