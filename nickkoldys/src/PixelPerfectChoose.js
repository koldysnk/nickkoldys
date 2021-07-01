import React, { useContext, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startPP, startPPTri, stepPP, stepPPTri, setPPBestData, setPPCurrAccuracy, setPPCurrData, setPPGenerationCount, setPPAccuracy, setPPChoosePicture, setPPActivePicture } from './actions';
import './PixelPerfectChoose.css';

export function PixelPerfectChoose(props) {
    const dispatch = useDispatch();
    
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

    return (
        <div className='PixelPerfectChoose' >
            <img className='ppChooseImg' onClick={selectPanda} src={'panda.jpg'}></img>
            <img className='ppChooseImg' onClick={selectCol} src={'colosseum.jpg'}></img>
            <img className='ppChooseImg' onClick={selectDino} src={'dino.jpg'}></img>
            <img className='ppChooseImg' onClick={selectUnder} src={'underwater.jpg'}></img>
        </div>
    );
}

