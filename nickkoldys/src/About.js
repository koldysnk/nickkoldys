import React from 'react';
import { Controller, Scene } from 'react-scrollmagic';
import './About.css';

export function About(props) {
    // let tracker = 0

    // document.onkeydown = checkKey;

    // function checkKey(e) {
    //     console.log(tracker)
    //     let flipable = document.getElementsByClassName('flipable')

    //     e = e || window.event;
    //     if (e.keyCode == '37') {
    //         // left arrow

    //         if(tracker>0){
    //             flipable[tracker].classList.toggle('right')
    //             flipable[tracker-1].classList.toggle('active')
    //             tracker-=1
    //         }
    //     }else if (e.keyCode == '39') {
    //         // right arrow
    //         if(tracker<flipable.length){
    //             flipable[tracker].classList.toggle('left')
    //             flipable[tracker+1].classList.toggle('active')
    //             tracker+=1
    //         }
    //     }

    // }

    // const left = () => {

    // }

    // const right = () => {

    // }

    return (
        <div className='About'>

            <div className='aboutCards'>

                <div className='aboutIntroCard flipable'>
                    <h2 className='aboutCardTitle'>About Me</h2>
                    <p className='aboutCardSubtitle'>Scroll to start</p>
                    <p className='aboutCardSubtitle'>(In Progress)</p>
                </div>

                <div className='aboutCreditsCard flipable right'>
                    <h3 className='aboutCardSmallTitle'>Credits</h3>
                    <ul className='creditsList'>
                        <li>Controller and computer icon by <a className='creditsLink' href="https://freeicons.io/profile/2257">www.wishforge.games</a> on <a className='creditsLink' href="https://freeicons.io">freeicons.io</a></li>
                        <li>Single player and multiplayer icon by <a className='creditsLink' href="https://freeicons.io/profile/3">icon king1</a> on <a className='creditsLink' href="https://freeicons.io">freeicons.io</a></li>
                        <li>Tic Tac Toe X and O icon by <a className='creditsLink' href="https://freeicons.io/profile/714">Raj Dev</a> on <a className='creditsLink' href="https://freeicons.io">freeicons.io</a></li>
                        <li>Hamburger icon by <a className='creditsLink' href="https://freeicons.io/profile/2257">www.wishforge.games</a> on <a className='creditsLink' href="https://freeicons.io">freeicons.io</a></li>
                        <li>Loading icon by <a className='creditsLink' href="https://freeicons.io/profile/2257">www.wishforge.games</a> on <a className='creditsLink' href="https://freeicons.io">freeicons.io</a> </li>
                        <li>Dictionary icon by <a className='creditsLink' href="https://freeicons.io/profile/2257">www.wishforge.games</a> on <a className='creditsLink' href="https://freeicons.io">freeicons.io</a></li>
                        <li>Robot icon by <a className='creditsLink' href="https://freeicons.io/profile/726">Free Preloaders</a> on <a className='creditsLink' href="https://freeicons.io">freeicons.io</a></li>
                        <li><a className='creditsLink' href='https://trello.com/b/CHd5DDcg/nick-koldys-personal-site'>View Trello</a></li>
                        <li>Panda photo by <a className='creditsLink' href="https://unsplash.com/@muffinwiz?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Lukas W.</a> on <a className='creditsLink' href="https://unsplash.com/s/visual/b8e34082-bf9c-4ecf-a93d-9958649e3e3b?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></li>
                        <li>Colosseum photo by <a className='creditsLink' href="https://unsplash.com/@emilianocicero?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Emiliano Cicero</a> on <a className='creditsLink' href="https://unsplash.com/t/history?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></li>
                        <li>Dinosaur photo by <a className='creditsLink' href="https://unsplash.com/@matreding?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Mathias P.R. Reding</a> on <a className='creditsLink' href="https://unsplash.com/t/history?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></li>
                        <li>Underwater photo by <a className='creditsLink' href="https://unsplash.com/@misheng_gz?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Mikhail Preobrazhenskiy</a> on <a className='creditsLink' href="https://unsplash.com/t/history?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></li>
                    </ul>
                </div>
            </div>

            
            {/* <script src='./AboutScrollMagic.js'></script> */}
        </div>
    );
}