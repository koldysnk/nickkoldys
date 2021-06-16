import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './PixelPerfect.css';

export function PixelPerfect(props) {
    const ogData = useSelector(state => state.ppOGData);
    const dispatch = useDispatch();



    const start = () => {
        let img = document.getElementsByClassName('ppOriginalImage')[0]
        let canvas = document.getElementsByClassName('canvas')[0]
        let context = canvas.getContext('2d')
        canvas.height = img.height
        canvas.width = img.width
        context.drawImage(img, 0, 0, img.width, img.height)
        let myData = context.getImageData(0, 0, img.width, img.height)
        let pix = myData.data
        let newData = new ImageData(img.width,img.height)
        let newPix = newData.data
        for (let i = 0, n = pix.length; i < n; i += 4) {
            newPix[i] = Math.floor(Math.random() * 256); // red
            newPix[i + 1] = Math.floor(Math.random() * 256); // green
            newPix[i + 2] = Math.floor(Math.random() * 256); // blue
            newPix[i + 3] = 255
        }

        context.putImageData(newData, 0, 0)
    }


    return (
        <div className='PixelPerfect' >
            <h2 className='ppTitle'>Pixel Perfect</h2>
            <div className='ppOriginalImageBox'>
                <img className='ppOriginalImage' src='panda.jpg'></img>
            </div>
            <button onClick={start}>Start</button>
            <canvas className='canvas'></canvas>
        </div>
    );
}