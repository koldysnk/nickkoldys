import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './PixelPerfect.css';

export function PixelPerfect(props) {
    const ogData = useSelector(state => state.ppOGData);
    const dispatch = useDispatch();

    const getRandomIntInclusive = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
      }

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
        let total=0
        for (let i = 0, n = pix.length; i < n; i += 4) {
            newPix[i] = Math.random() * 256; // red
            let a = (255 - Math.abs(newPix[i]-pix[i]))/255
            newPix[i + 1] = Math.random() * 256; // green
            let b = (255 - Math.abs(newPix[i+1]-pix[i+1]))/255
            newPix[i + 2] = Math.random() * 256; // blue
            let c = (255 - Math.abs(newPix[i+2]-pix[i+2]))/255
            newPix[i + 3] = 255

            let d = (a+b+c)/3
            total+=d
        }
        let accuracy = total/(pix.length*3/4)
        console.log(accuracy)
        context.putImageData(newData, 0, 0)
        let mr = 5

        while(accuracy<=.95){
            let currData = new ImageData(img.width,img.height)
            let currPix = currData.data
            for (let i = 0, n = pix.length; i < n; i += 4) {
                let a = pix[i]
                let maxA = newPix[i]
                let aMax = (255 - Math.abs(maxA-a))/255
                
                let b =pix[i+1]
                let maxB = newPix[i+1]
                let bMax = (255 - Math.abs(maxB-b))/255
                
                let c = pix[i+2]
                let maxC = newPix[i+2]
                let cMax = (255 - Math.abs(maxC-c))/255
                
                for(let j = 0;j<10;j++){
                    let newVal = (newPix[i]+getRandomIntInclusive(-mr,mr))%255
                    let newA = (255 - Math.abs(newVal-a))/255

                    if(newA>aMax){
                        aMax = newA
                        maxA = newVal
                    }

                    newVal = (newPix[i+1]+getRandomIntInclusive(-mr,mr))%255
                    let newB = (255 - Math.abs(newVal-b))/255

                    if(newB>bMax){
                        bMax = newB
                        maxB = newVal
                    }


                    newVal = (newPix[i+2]+getRandomIntInclusive(-mr,mr))%255
                    let newC = (255 - Math.abs(newVal-c))/255

                    if(newC>cMax){
                        cMax = newC
                        maxC = newVal
                    }
                }
                if(aMax>1||bMax>1 ||cMax>1){
                    console.log('a')
                }
                currPix[i] = maxA // red
                currPix[i+1] = maxB // green
                currPix[i+2] = maxC // blue
    
                currPix[i+4] = 255

                let d = (aMax+bMax+cMax)/3

                
                if(d>1){
                    console.log('a')
                }
                total+=d
            }
            if(currPix.length!=newPix.length){
                console.log('a')
            }
            accuracy = total/(pix.length*3/4)
            console.log(accuracy)
            context.putImageData(currData, 0, 0)
        }
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