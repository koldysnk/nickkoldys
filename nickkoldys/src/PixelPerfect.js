import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startPP, stepPP } from './actions';
import './PixelPerfect.css';

export function PixelPerfect(props) {
    const currData = useSelector(state => state.ppCurrData);
    const goalData = useSelector(state => state.ppGoalData);
    const started = useSelector(state => state.ppStarted);
    const accuracy = useSelector(state => state.ppAccuracy);
    
    const dispatch = useDispatch();

    const start = () => {

        let img = document.getElementsByClassName('ppOriginalImage')[0]
        let canvas = document.getElementsByClassName('canvas')[0]
        let context = canvas.getContext('2d')
        let width = img.width
        let height = img.height
        canvas.height = height
        canvas.width = width
        context.drawImage(img, 0, 0, width, height)
        let goalData = context.getImageData(0, 0, width, height)
        dispatch(startPP(goalData,width,height))
    }

    const step = () => {
        if (started) {
            let canvas = document.getElementsByClassName('canvas')[0]
            dispatch(stepPP(goalData,currData,canvas.width,canvas.height))
        }
    }


    useEffect(() => {
        if(started){
            let canvas = document.getElementsByClassName('canvas')[0]
            let context = canvas.getContext('2d')
            context.putImageData(currData, 0, 0);
            step()
        }
    }, [dispatch,started,accuracy])

    return (
        <div className='PixelPerfect' >
            <h2 className='ppTitle'>Pixel Perfect</h2>
            <div className='ppOriginalImageBox'>
                <img className='ppOriginalImage' src='panda.jpg'></img>
            </div>
            <div><button onClick={start}>Start</button></div>
            <canvas className={`canvas ${started ? '' : 'hiddenCanvas'}`} ></canvas>
            {started ? `Accuracy: ${(accuracy * 100).toFixed(4).replace(/\.0*$|0+$/, "")}%` : ''}

        </div>
    );
}