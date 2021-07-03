import React, { useContext, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startPP, startPPTri, stepPP, stepPPTri, setPPBestData, setPPCurrAccuracy, setPPCurrData, setPPGenerationCount, setPPAccuracy, setPPChoosePicture } from './actions';
import './PixelPerfect.css';
import { PixelPerfectChoose } from './PixelPerfectChoose';

export function PixelPerfect(props) {
    // const currData = useSelector(state => state.ppCurrData);
    // const bestData = useSelector(state => state.ppBestData);
    // const goalData = useSelector(state => state.ppGoalData);
    //const started = useSelector(state => state.ppStarted);
    //const accuracy = useSelector(state => state.ppAccuracy);
    //const currAccuracy = useSelector(state => state.ppCurrAccuracy);
    const ppGenerationCount = useSelector(state => state.ppGenerationCount);
    const activePicture = useSelector(state => state.ppActivePicture);
    const choosePicture = useSelector(state => state.ppChoosePicture);

    const dispatch = useDispatch();



    function ppComputeAccuracy(pix, newPix) {
        let total = 0
        let count = 0
        for (let i = 0, n = pix.length; i < n; i += 4) {
            let a = (255 - Math.abs(newPix[i] - pix[i])) / 255
            let b = (255 - Math.abs(newPix[i + 1] - pix[i + 1])) / 255
            let c = (255 - Math.abs(newPix[i + 2] - pix[i + 2])) / 255

            let d = (a + b + c) / 3
            total += d
            count += 1
        }
        return total / count
    }

    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
    }

    const [count, setCount] = useState(0)
    const [errMessage, setErrMessage] = useState('')

    // Use useRef for mutable variables that we want to persist
    // without triggering a re-render on their change
    const started = useRef(false);
    const currData = useRef();
    const bestData = useRef();
    const goalData = useRef();
    const accuracy = useRef(0);
    const currAccuracy = useRef(0);

    const animate = () => {
        if (started.current) {
            let canvas = document.getElementsByClassName('canvas')[0]
            if (!canvas) {
                return;
            }
            let context = canvas.getContext('2d')
            let canvas2 = document.getElementsByClassName('canvas')[1]
            if (!canvas2) {
                return;
            }
            let context2 = canvas2.getContext('2d')


            let maxAccuracy = 0
            let maxData = new ImageData(canvas.width, canvas.height)

            for (let i = 0; i < 10; i++) {
                context2.putImageData(bestData.current, 0, 0)

                let r = getRandomIntInclusive(0, 255)
                let g = getRandomIntInclusive(0, 255)
                let b = getRandomIntInclusive(0, 255)
                let a = Math.random()

                context2.fillStyle = `rgba(
                ${r},
                ${g},
                ${b},
                ${a})`;
                context2.beginPath();
                let x1 = getRandomIntInclusive(0, canvas.width)
                let y1 = getRandomIntInclusive(0, canvas.height)
                let x2 = getRandomIntInclusive(0, canvas.width)
                let y2 = getRandomIntInclusive(0, canvas.height)
                let x3 = getRandomIntInclusive(0, canvas.width)
                let y4 = getRandomIntInclusive(0, canvas.height)
                context2.moveTo(x1, y1);
                context2.lineTo(x2, y2);
                context2.lineTo(x3, y4);
                context2.fill();

                let newData = context2.getImageData(0, 0, canvas.width, canvas.height)
                let newAccuracy = ppComputeAccuracy(goalData.current.data, newData.data)

                if (newAccuracy > maxAccuracy) {
                    maxAccuracy = newAccuracy
                    maxData = newData
                }
            }

            if (maxAccuracy > accuracy.current) {
                bestData.current = maxData
                accuracy.current = maxAccuracy
                context.putImageData(bestData.current, 0, 0)
            }

            currAccuracy.current = maxAccuracy
            currData.current = maxData
            context2.putImageData(currData.current, 0, 0)








            // Pass on a function to the setter of the state
            // to make sure we always have the latest state
            setCount(prevCount => (prevCount + 1));





            requestAnimationFrame(animate);
        }
    }

    function sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
            currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    }

    const loadImage = (src,width,height) =>
        new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.width=width
            img.height=height
            img.crossOrigin = "Anonymous";
            img.onerror = reject;
            img.src = src;
        })
        ;

    const start = () => {
        if (started.current) {
            started.current = false
            setCount(0)
            return
        }
        cancelAnimationFrame(animate)

        let image = document.getElementsByClassName('ppOriginalImage')[0]
        loadImage(image.src,image.width,image.height).then(img => {
            
            // let cv = document.createElement('canvas');
            // var ct = canvas.getContext('2d');
            // cv.width = img.width;
            // cv.height = img.height;
            // ct.drawImage(img, 0, 0 );
            // var myData = ct.getImageData(0, 0, img.width, img.height);

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

            if (!(img.naturalWidth !== 0)) {
                console.log('wait')
                start()
                return
            }

            currData.current = context.getImageData(0, 0, width, height)
            goalData.current = new ImageData(width, height)
            goalData.current.data.set(currData.current.data)
            bestData.current = new ImageData(width, height)
            bestData.current.data.set(currData.current.data)
            context.fillStyle = 'white'
            context2.fillStyle = 'white'
            context.fillRect(0, 0, width, height)
            context2.fillRect(0, 0, width, height)


            currData.current = context.getImageData(0, 0, width, height)
            bestData.current = new ImageData(width, height)
            bestData.current.data.set(currData.current.data)

            let a = ppComputeAccuracy(goalData.current.data, currData.current.data)

            accuracy.current = a
            currAccuracy.current = a



            context.putImageData(bestData.current, 0, 0)
            context2.putImageData(currData.current, 0, 0)


            started.current = true
            //requestRef.current = requestAnimationFrame(animate);
            requestAnimationFrame(animate)
        }).catch(err => {
            setErrMessage('Image Unavailable')
        })


        //return () => cancelAnimationFrame(requestRef.current);
    } // Make sure the effect runs only oncea

    const choosePic = () => {
        dispatch(setPPChoosePicture(true))
    }

    useEffect(() => {
        started.current = false
        setCount(0)
        setErrMessage('')
    }, [activePicture])

    return (
        <div className='PixelPerfect' >
            <h2 className='ppTitle'>Pixel Perfect</h2>
            <div className='ppOriginalImageBox'>
                <img className='ppOriginalImage' src={activePicture}></img>
            </div>
            <div><button onClick={start}>{started.current ? 'Stop' : 'Start'}</button><button onClick={choosePic}>Select Image</button></div>
            {count>0?`Generation Count: ${Math.round(count)}`:errMessage}
            <canvas className={`canvas ${started.current ? '' : 'hiddenCanvas'}`} ></canvas>
            {started.current ? `Best Accuracy: ${(accuracy.current * 100).toFixed(4).replace(/\.0*$|0+$/, "")}%` : ''}
            <canvas className={`canvas ${started.current ? '' : 'hiddenCanvas'}`} ></canvas>
            {started.current ? `Current Accuracy: ${(currAccuracy.current * 100).toFixed(4).replace(/\.0*$|0+$/, "")}%` : ''}
            {choosePicture ? <PixelPerfectChoose /> : ''}
            <h3 className='descriptionTitle'>Description</h3>
            <p className='descriptionText'>
                The Pixel Perfect project uses a variation of the genetic algorithm in the hill climber class.
                The initial build of the algorithm generated a number of random triangles and chose the triangle
                that improved the accuracy of the developing image the most. This process was repeated at each generation
                and the generated image eventually became more and more accurate. However, the original algorithm did not
                fully embody the theory behind a genetic algorithm. To fix this, I added the mutation component to the algorithm.
                Each time a triangle is generated a new generation of triangles are created by mutating the original triangle.
                The most accurate triangle from the new generation is then chosen to be the original triangle for the next generation.
                This process is repeated until the accuracy begins to plateau, then a new random triangle is generated and the process starts again.
            </p>
        </div>
    );
}

