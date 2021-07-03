import React, { useContext, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startPP, startPPTri, stepPP, stepPPTri, setPPBestData, setPPCurrAccuracy, setPPCurrData, setPPGenerationCount, setPPAccuracy, setPPChoosePicture, setPPActivePicture } from './actions';
import './PixelPerfectChoose.css';
import {useDropzone} from 'react-dropzone'

export function PixelPerfectChoose(props) {
    const dispatch = useDispatch();

    const [message, setMessage] = useState('Click or Drop to upload.')


    const {getRootProps, getInputProps} = useDropzone({
        accept: 'image/*',
        onDrop: (acceptedFiles) => {
            if (!acceptedFiles[0]){
                setMessage('Click or Drop to upload. (Must be an Image)')
            } else{
                let url = URL.createObjectURL(acceptedFiles[0])
                dispatch(setPPActivePicture(url))
                dispatch(setPPChoosePicture(false))
            }

        }
    })
    
    const selectWhale = () => {
        dispatch(setPPActivePicture('whale.jpg'))
        dispatch(setPPChoosePicture(false))
    }
    
    const selectPanda = () => {
        dispatch(setPPActivePicture('panda.jpg'))
        dispatch(setPPChoosePicture(false))
    }

    const selectCol = () => {
        dispatch(setPPActivePicture('colosseum.jpg'))
        dispatch(setPPChoosePicture(false))
    }

    const selectDino = () => {
        dispatch(setPPActivePicture('dino.jpg'))
        dispatch(setPPChoosePicture(false))
    }

    const selectUnder = () => {
        dispatch(setPPActivePicture('underwater.jpg'))
        dispatch(setPPChoosePicture(false))
    }

    const selectEyes = () => {
        dispatch(setPPActivePicture('eyes.jpg'))
        dispatch(setPPChoosePicture(false))
    }

    const close = () => {
        dispatch(setPPChoosePicture(false))
    }

    return (
        <div className='PixelPerfectChoose' >
            <div className='ppImages'>
                <img className='ppChooseImg' onClick={selectPanda} src={'panda.jpg'}></img>
                <img className='ppChooseImg' onClick={selectWhale} src={'whale.jpg'}></img>
                <img className='ppChooseImg' onClick={selectCol} src={'colosseum.jpg'}></img>
                <img className='ppChooseImg' onClick={selectDino} src={'dino.jpg'}></img>
                <img className='ppChooseImg' onClick={selectUnder} src={'underwater.jpg'}></img>
                <img className='ppChooseImg' onClick={selectEyes} src={'eyes.jpg'}></img>
            </div>
            <div className='ppUpload' {...getRootProps()}>
                <input {...getInputProps()}></input>
                <p>{message}</p>
            </div>
            <p className='ppChooseClose' onClick={close}>Close</p>
        </div>
    );
}

