import React from 'react';
import { Controller, Scene } from 'react-scrollmagic';
import './About.css';

export function About(props) {
    function callback(mutationsList) {
        mutationsList.forEach(mutation => {
            if (mutation.attributeName === 'class') {
                alert('Ch-ch-ch-changes!')
            }
        })
    }

    const mutationObserver = new MutationObserver(callback)



    const addObservers = () => {
        mutationObserver.observe(
            document.getElementsByClassName('aboutIntroCard')[0],
            { attributes: true }
        )
    }

    return (
        <div className='About' >
            <div className="bigSpacer" />
            <div id="trigger" />
            <div className="mediumSpacer" />
            <div id="trigger2" />
            <div className="mediumSpacer" />
            <div className='aboutCards'>
                <Controller>

                    <Scene classToggle="left" triggerElement="#trigger" indicators={true} reverse='true'>
                        {(progress, event) => (


                            <div className='aboutIntroCard flipable' >
                                <h2 className='aboutCardTitle'>About Me</h2>
                                <p className='aboutCardSubtitle'>Scroll to start</p>
                                <p className='aboutCardSubtitle'>(In Progress)</p>
                            </div>
                        )}
                    </Scene>

                    <Scene classToggle="front" triggerElement="#trigger" indicators={true} reverse='true'>
                        {(progress, event) => (


                            <div className='aboutEducationCard flipable'>
                                <h2 className='aboutCardSmallTitle'>Education</h2>
                                <p>I went to JMU</p>.
                            </div>
                        )}
                    </Scene>

                    <Scene classToggle="front" triggerElement="#trigger2" indicators={true} reverse='true'>
                        {(progress, event) => (
                            <div className='aboutCreditsCard flipable'>
                                <h3 className='aboutCardSmallTitle'>Credits</h3>
                                <div className='aboutCreditsListBox'>
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
                                        <li>Elephant Photo by <a className='creditsLink' href="https://unsplash.com/@wolfgang_hasselmann?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Wolfgang Hasselmann</a> on <a className='creditsLink' href="https://unsplash.com/s/photos/elephant?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></li>
                                        <li>Eiffel Tower photo by <a className='creditsLink' href="https://unsplash.com/@anthonydelanoix?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Anthony DELANOIX</a> on <a className='creditsLink' href="https://unsplash.com/s/photos/eiffel-tower?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></li>
                                        <li>Dog photo by <a className='creditsLink' href="https://unsplash.com/@alvannee?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Alvan Nee</a> on <a className='creditsLink' href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></li>
                                        <li>Arches photo by <a className='creditsLink' href="https://unsplash.com/@kencheungphoto?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Ken Cheung</a> on <a className='creditsLink' href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></li>
                                        <li>Mountain photo by <a className='creditsLink' href="https://unsplash.com/@kencheungphoto?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Ken Cheung</a> on <a className='creditsLink' href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </Scene>


                </Controller>
            </div>











        </div>
    );
}