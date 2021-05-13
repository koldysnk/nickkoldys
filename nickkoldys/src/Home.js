import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import './Home.css';
import anime from 'animejs/lib/anime.es.js';

export function Home(props) {

    console.log("animate");
    anime.timeline({ loop: true })
        .add({
            targets: '.ml13 .letter',
            translateY: [0, 100],
            translateZ: 0,
            opacity: [1, 0],
            easing: "easeInExpo",
            duration: 1400,
            delay: (el, i) => 100 + 30 * i
        }).add({
            targets: '.ml13 .letter',
            translateY: [-100, 0],
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 1800,
            delay: (el, i) => 300 + 30 * i
        });

    return (
        <div className='Home'>
            <div className="nameBox">
                <h1 className='ml13'>
                    <span className='letter'>N</span>
                    <span className='letter'>i</span>
                    <span className='letter'>c</span>
                    <span className='letter'>k</span>
                    <span className='letter'>&#8226;</span>
                    <span className='letter'>K</span>
                    <span className='letter'>o</span>
                    <span className='letter'>l</span>
                    <span className='letter'>d</span>
                    <span className='letter'>y</span>
                    <span className='letter'>s</span>
                </h1>

            </div>
            <div className='navSection'>
                <div className="gameBox navBox">
                    <Link to="/games">
                        <img src='controllerIcon.png' className="navIcon"></img>
                        <p className="navItem">Games</p>
                    </Link>
                </div>
                <div className="projectBox navBox">
                    <Link to="/projects">
                        <img src='computerIcon.png' className="navIcon"></img>
                        <p className="navItem">Projects</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}