import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { createTimeline} from 'animejs';

import './App.css';
import './Home.css';

export function Home(props) {

    useEffect(() => {
        createTimeline({ loop: 3})
            .add('.letter',{translateY: [0, 100],
                translateZ: 0,
                opacity: [1, 0],
                ease: "inExpo",
                duration: 1400,
                autoplay: true,
                delay: (el, i) => 100 + 30 * i})
            .add('.letter',{translateY: [-100, 0],
                opacity: [0, 1],
                ease: "outExpo",
                duration: 1800,
                delay: (el, i) => 300 + 30 * i
            });
    })    

    return (
        <div className='Home'>
            <div className="nameBox">
                <h1 className='ml13'>
                    <span className='letter'>N</span>
                    <span className='letter'>i</span>
                    <span className='letter'>c</span>
                    <span className='letter'>k</span>
                    <br className='homeNameBreak'></br>
                    <span className='letter'>&#8226;</span>
                    <br className='homeNameBreak'></br>
                    <span className='letter'>K</span>
                    <span className='letter'>o</span>
                    <span className='letter'>l</span>
                    <span className='letter'>d</span>
                    <span className='letter'>y</span>
                    <span className='letter'>s</span>
                </h1>

            </div>
            <header className="App-header">
                <p>
                    nickkoldys.com version 2 coming soon.
                </p>
                <p><a className="App-Link" href="https://nickkoldys.com">version 1</a></p>
                <p><Link className="App-Link" to="/food-planner">Food Planner</Link></p>
            </header>
        </div>
    );
}