import React from 'react';
import './Spinner.css';


export function Spinner(props) {


    return (
        <div className='Spinner'>
            <img className='loadingIcon' src='./loadingIcon.png' />
            <br></br>
            <label className='loadingText'>Loading...</label>
        </div>
    );

}