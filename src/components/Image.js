import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import useTFClassify from '../utils/hooks/useTFClassify'

function Image({ image, index, handleRemove, show }) {

    const [isHovering, setIsHovering] = useState(false)
    const imageRef = useRef()
    const {predict, predictions, setPredictions, isLoading} = useTFClassify()

    return (
        <div 
            className="relative"
            onMouseEnter={() => setIsHovering(true)} 
            onMouseLeave={() => setIsHovering(false)}
        >   
            {(predictions.length > 0 || isLoading) && (
                <span 
                    className="absolute bg-gray-800 text-white rounded-lg shadow px-2 left-0 ml-10 mt-3"
                    onClick={() => setPredictions([])}
                >
                    {isLoading && <p>Fetching results ...</p>}
                    {predictions.map((prediction, index) => 
                            <div className='m-auto flex justify-between w-64' key={index}>
                                <p>{prediction.className}</p>
                                <p>{Math.floor(prediction.probability * 100)} %</p>
                            </div>
                        )
                    }
                </span>)
            }
            <i 
                className={`right-icon fas fa-times absolute cursor-pointer ${isHovering ? 'opacity-50' : 'opacity-0' } hover:opacity-100`}
                onClick={() => handleRemove(index)}
            />
             <i 
                className={`left-icon fas fa-search absolute cursor-pointer ${isHovering ? 'opacity-50' : 'opacity-0' } hover:opacity-100`}
                onClick={() => predict(imageRef.current)}
            />
            <img 
                alt='img'
                ref={imageRef}
                src={image}
                onClick={show}
                crossOrigin='anonymous'
            />
        </div>
    )
}

Image.propTypes = {
    show: PropTypes.func,
    index: PropTypes.number,
    image: PropTypes.string,
    handleRemove: PropTypes.func
}

export default Image