import React, { useContext, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRandomIntInclusive, setPPChoosePicture, setPPActivePicture } from './actions';
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

    let list1 = []
    let list2 = []
    let list3 = []
    let list4 = []

    for(let i = 0;i<10;i++){
        list1.push(`https://picsum.photos/id/${getRandomIntInclusive(0,500)}/${getRandomIntInclusive(200,1000)}/${getRandomIntInclusive(200,1000)}`)
        list2.push(`https://picsum.photos/id/${getRandomIntInclusive(0,500)}/${getRandomIntInclusive(200,1000)}/${getRandomIntInclusive(200,1000)}`)
        list3.push(`https://picsum.photos/id/${getRandomIntInclusive(0,500)}/${getRandomIntInclusive(200,1000)}/${getRandomIntInclusive(200,1000)}`)
        list4.push(`https://picsum.photos/id/${getRandomIntInclusive(0,500)}/${getRandomIntInclusive(200,1000)}/${getRandomIntInclusive(200,1000)}`)
    }

    const selectPic = (link) => {
        dispatch(setPPActivePicture(link))
        dispatch(setPPChoosePicture(false))
    }

    const close = () => {
        dispatch(setPPChoosePicture(false))
    }



    return (
        <div className='PixelPerfectChoose' >
            <div className='ppImages'>
                <div className='massonryBox'>
                <img className='ppChooseImg' onClick={e => selectPic(e.target.src)} src={'panda.jpg'}></img>
                <img className='ppChooseImg' onClick={e => selectPic(e.target.src)} src={'whale.jpg'}></img>
                <img className='ppChooseImg' onClick={e => selectPic(e.target.src)} src={'eyes.jpg'}></img>
                <img className='ppChooseImg' onClick={e => selectPic(e.target.src)} src={'mountain.jpg'}></img>
                {list1.map((x,i)=>{
                    return <img key={i} className='ppChooseImg' onClick={e => selectPic(e.target.src)} src={x}></img>
                })}
                </div>
                <div className='massonryBox'>
                <img className='ppChooseImg' onClick={e => selectPic(e.target.src)} src={'colosseum.jpg'}></img>
                <img className='ppChooseImg' onClick={e => selectPic(e.target.src)} src={'dog.jpg'}></img>
                {list2.map((x,i)=>{
                    return <img key={i} className='ppChooseImg' onClick={e => selectPic(e.target.src)} src={x}></img>
                })}
                </div>
                <div className='massonryBox'>
                <img className='ppChooseImg' onClick={e => selectPic(e.target.src)} src={'dino.jpg'}></img>
                <img className='ppChooseImg' onClick={e => selectPic(e.target.src)} src={'eiffelTower.jpg'}></img>
                {list3.map((x,i)=>{
                    return <img key={i} className='ppChooseImg' onClick={e => selectPic(e.target.src)} src={x}></img>
                })}
                </div>
                <div className='massonryBox'>
                <img className='ppChooseImg' onClick={e => selectPic(e.target.src)} src={'underwater.jpg'}></img>
                <img className='ppChooseImg' onClick={e => selectPic(e.target.src)} src={'elephant.jpg'}></img>
                <img className='ppChooseImg' onClick={e => selectPic(e.target.src)} src={'arches.jpg'}></img>
                {list4.map((x,i)=>{
                    return <img key={i} className='ppChooseImg' onClick={e => selectPic(e.target.src)} src={x}></img>
                })}
                </div>
            </div>
            <div className='ppUpload' {...getRootProps()}>
                <input {...getInputProps()}></input>
                <p>{message}</p>
            </div>
            <p className='ppChooseClose' onClick={close}>Close</p>
        </div>
    );
}

