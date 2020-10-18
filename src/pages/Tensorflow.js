import React, { useRef } from 'react'
import useTFClassify from '../utils/hooks/useTFClassify'

export default function Tensorflow() {

    const imageRef = useRef()
    const {predict, predictions, isLoading} = useTFClassify()

    return (
        <div className='flex justify-center'>
            <div className='w-fill my-12'>
                <h1 className='text-center'>Tensorflow Example</h1>
                <img 
                    alt='img'
                    className='w-full'
                    crossOrigin='anonymous'
                    src="https://images.unsplash.com/photo-1602900004353-2e786ce8f35c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE3MzM5N30" 
                    ref={imageRef} 
                />
                <div className="text-center my-5">
                    {predictions.length > 0 && 
                        predictions.map((prediction, index) => 
                            <div className='m-auto flex justify-between w-64' key={index}>
                                <p>{prediction.className}</p>
                                <p>{Math.floor(prediction.probability * 100)} %</p>
                            </div>
                        )
                    }
                    <button 
                        className="p-2 rounded bg-gray-800 text-white w-64"
                        onClick={() => predict(imageRef.current)}
                    >
                        {isLoading && '\u231B'}
                        {!isLoading && 'Predict Result'}
                    </button>
                </div>
            </div>
        </div>
    )
}