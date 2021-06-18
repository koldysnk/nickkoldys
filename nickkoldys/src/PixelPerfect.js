import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startPP, startPPTri, stepPP, stepPPTri } from './actions';
import './PixelPerfect.css';

export function PixelPerfect(props) {
    const currData = useSelector(state => state.ppCurrData);
    const bestData = useSelector(state => state.ppBestData);
    const goalData = useSelector(state => state.ppGoalData);
    const started = useSelector(state => state.ppStarted);
    const accuracy = useSelector(state => state.ppAccuracy);
    const currAccuracy = useSelector(state => state.ppCurrAccuracy);
    const isWaiting = useSelector(state => state.isWaiting);
    
    const dispatch = useDispatch();

    const start = () => {

        let img = document.getElementsByClassName('ppOriginalImage')[0]
        let canvas = document.getElementsByClassName('canvas')[0]
        let context = canvas.getContext('2d')
        let canvas2 = document.getElementsByClassName('canvas')[1]
        let context2 = canvas2.getContext('2d')
        let width = img.width
        let height = img.height
        canvas.height = height
        canvas.width = width
        canvas2.height = height
        canvas2.width = width
        context.drawImage(img, 0, 0, width, height)
        let currData = context.getImageData(0, 0, width, height)
        let goalData = new ImageData(width,height)
        goalData.data.set(currData.data)
        context.fillStyle = 'white'
        context2.fillStyle = 'white'
        context.fillRect(0,0,width,height)
        context2.fillRect(0,0,width,height)
        dispatch(startPPTri(goalData,context,context2,width,height))
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
            let canvas2 = document.getElementsByClassName('canvas')[1]
            let context2 = canvas2.getContext('2d')
            let width = canvas.width
            let height = canvas.height
            context.putImageData(bestData,0,0)
            context2.putImageData(currData,0,0)
            dispatch(stepPPTri(context,context2,goalData,bestData,accuracy,currData,width,height))
        }
    }, [dispatch,started,accuracy,currAccuracy])

    return (
        <div className='PixelPerfect' >
            <h2 className='ppTitle'>Pixel Perfect</h2>
            <div className='ppOriginalImageBox'>
                <img className='ppOriginalImage' src='panda.jpg'></img>
            </div>
            <div><button onClick={start}>Start</button></div>
            <canvas className={`canvas ${started ? '' : 'hiddenCanvas'}`} ></canvas>
            {started ? `Best Accuracy: ${(accuracy * 100).toFixed(4).replace(/\.0*$|0+$/, "")}%` : ''}
            <canvas className={`canvas ${started ? '' : 'hiddenCanvas'}`} ></canvas>
            {started ? `Current Accuracy: ${(currAccuracy * 100).toFixed(4).replace(/\.0*$|0+$/, "")}%` : ''}
        </div>
    );
}