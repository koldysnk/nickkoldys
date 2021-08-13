import React, { useEffect }  from 'react';
import './About.css';

export function About(props) {

    const particleTransition = {
        Particle: function(x, y) {
            this.x = x;
            this.y = y;
            this.radius = 3.5;
            this.draw = function(ctx) {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.fillStyle = '#282c34';
                ctx.fillRect(0, 0, this.radius, this.radius);
                ctx.restore();
            };
        },
        init: function() {
            particleTransition.canvas = document.getElementsByClassName('transitionWord')[0]
            particleTransition.ctx = particleTransition.canvas.getContext('2d')
            if(window.innerHeight>window.innerWidth || window.innerWidth<715){
                particleTransition.W = window.innerWidth*4/5;
            }else{
                particleTransition.W = window.innerWidth/3;
            }
            particleTransition.H = window.innerHeight/5;
            particleTransition.particlePositions = [];
            particleTransition.particles = [];
            particleTransition.tmpCanvas = document.createElement('canvas');
            particleTransition.tmpCtx = particleTransition.tmpCanvas.getContext('2d');
    
            particleTransition.canvas.width = particleTransition.W;
            particleTransition.canvas.height = particleTransition.H;
    
            setInterval(function(){
                particleTransition.changeWord();
                particleTransition.getPixels(particleTransition.tmpCanvas, particleTransition.tmpCtx);
            }, 1200);
    
            particleTransition.makeParticles(1000);
            particleTransition.animate();
        }, 
        currentPos: 0,
        changeWord: function() {
            var letters = ['Me', 'Nick']
            particleTransition.time = letters[particleTransition.currentPos];
            particleTransition.currentPos++;
            if (particleTransition.currentPos >= letters.length) {
                particleTransition.currentPos = 0;
            }
        },
        makeParticles: function(num) {
            for (var i = 0; i <= num; i++) {
                particleTransition.particles.push(new particleTransition.Particle(particleTransition.W / 2 + Math.random() * 400 - 200, particleTransition.H / 2 + Math.random() * 400 -200));
            }
        },
        getPixels: function(canvas, ctx) {
            var keyword = particleTransition.time,
                gridX = 6,
                gridY = 6;
            if(window.innerHeight>window.innerWidth || window.innerWidth<715){
                canvas.width = window.innerWidth*4/5;
                ctx.font = `italic bold ${window.innerHeight/10}px Noto Serif`;
            }else{
                canvas.width = window.innerWidth/3;
                ctx.font = `italic bold ${window.innerHeight/5}px Noto Serif`;
            }
            canvas.height = window.innerHeight/5;
            ctx.fillStyle = 'red';
            ctx.font = `italic bold ${window.innerHeight/5}px Noto Serif`;
            ctx.fillText(keyword, canvas.width / 2 - ctx.measureText(keyword).width / 2, canvas.height*3 / 4 );
            var idata = ctx.getImageData(0, 0, canvas.width, canvas.height);
            var buffer32 = new Uint32Array(idata.data.buffer);
            if (particleTransition.particlePositions.length > 0) particleTransition.particlePositions = [];
            for (var y = 0; y < canvas.height; y += gridY) {
                for (var x = 0; x < canvas.width; x += gridX) {
                    if (buffer32[y * canvas.width + x]) {
                        particleTransition.particlePositions.push({x: x, y: y});
                    }
                }
            }
        },
        animateParticles: function() {
            var p, pPos;
            for (var i = 0, num = particleTransition.particles.length; i < num; i++) {
                p = particleTransition.particles[i];
                pPos = particleTransition.particlePositions[i];
                if (particleTransition.particles.indexOf(p) === particleTransition.particlePositions.indexOf(pPos)) {
                p.x += (pPos.x - p.x) * .3;
                p.y += (pPos.y - p.y) * .3;
                p.draw(particleTransition.ctx);
            }
            }
        },
        animate: function() {
            requestAnimationFrame(particleTransition.animate);
            particleTransition.ctx.fillStyle = 'rgba(97, 218, 251, .8)';
            particleTransition.ctx.fillRect(0, 0, particleTransition.W, particleTransition.H);
            particleTransition.animateParticles();
        }
    };

    function cancelAllAnimationFrames() {
        var id = window.requestAnimationFrame(function () { });
        while (id--) {
            window.cancelAnimationFrame(id);
        }
    }

    useEffect(() => {
        cancelAllAnimationFrames()
        particleTransition.init()
    }, []);

    return (
        <div className='About' >
            <div className='aboutIntro'>
                <h2 className='aboutWordStyle' >About</h2>
                <canvas className='transitionWord'></canvas>
            </div>
            <div className='aboutJMU'>

            </div>






        </div>
    );
}
/*

<div className="bigSpacer" />
            <div id="trigger" />
            <div className="mediumSpacer" />
            <div id="trigger2" />
            <div className="mediumSpacer" />
            <div id="trigger3" />
            <div className="mediumSpacer" />
            <div className='aboutCards'>
                <Controller>
                    <Scene classToggle="left" triggerElement="#trigger2" indicators={true} reverse='true'>
                        {(progress, event) => (
                            <div className='introAndEdu flipable'>
                                <Scene classToggle="left" triggerElement="#trigger" indicators={true} reverse='true'>
                                    {(progress, event) => (


                                        <div className='aboutIntroCard flipable' >
                                            <h2 className='aboutCardTitle'>About Me</h2>
                                            <p className='aboutCardSubtitle'>Scroll slowly</p>
                                            <p className='aboutCardSubtitle'>(In Progress)</p>
                                        </div>
                                    )}
                                </Scene>

                                <Scene classToggle="front" triggerElement="#trigger" indicators={true} reverse='true'>
                                    {(progress, event) => (


                                        <div className='aboutEducationCard flipable'>
                                            <h2 className='aboutCardSmallTitle'>Education</h2>
                                            <h3 className='aboutCardVerySmallTitle'>James Madison University</h3>
                                            <ul className='creditsList'>
                                                <li>Computer Science Major</li>
                                                <li>Mathematics Minor</li>
                                                <li>3.785 GPA</li>
                                                <li>UPE Honor Society Treasurer</li>
                                            </ul>
                                        </div>
                                    )}
                                </Scene>
                            </div>
                        )}
                    </Scene>
                    <Scene classToggle="front" triggerElement="#trigger2" indicators={true} reverse='true'>
                        {(progress, event) => (
                            <div className='workAndCredits flipable'>
                                <Scene classToggle="left" triggerElement="#trigger3" indicators={true} reverse='true'>
                                    {(progress, event) => (


                                        <div className='aboutWorkCard flipable' >
                                            <h2 className='aboutCardSmallTitle'>Employent</h2>
                                        </div>
                                    )}
                                </Scene>
                                <Scene classToggle="front" triggerElement="#trigger3" indicators={true} reverse='true'>
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
                                                    <li>Graduation cap icon by <a className='creditsLink' href="https://freeicons.io/profile/2257">www.wishforge.games</a> on <a className='creditsLink' href="https://freeicons.io">freeicons.io</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                </Scene>
                            </div>
                        )}
                    </Scene>





                </Controller>
            </div>


<div className='About' >
            <script>
                var controller = new ScrollMagic.Controller();
            </script>
            <div className="bigSpacer" />
            <div id="trigger" />
            <div className="mediumSpacer" />
            <div id="trigger2" />
            <div className="mediumSpacer" />
            <div className='aboutCards'>
                <div className='aboutIntroCard flipable' >
                    <h2 className='aboutCardTitle'>About Me</h2>
                    <p className='aboutCardSubtitle'>Scroll to start</p>
                    <p className='aboutCardSubtitle'>(In Progress)</p>
                </div>


                <div className='aboutEducationCard flipable'>
                    <h2 className='aboutCardSmallTitle'>Education</h2>
                    <p>I went to JMU</p>.
                </div>
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
            </div>


            <script src='AboutScrollMagic.js'></script>
            <script >console.log('a');</script>







        </div>
*/


/*
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
*/