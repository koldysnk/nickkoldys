import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import './sideBar.css';

export function SideBar(){
    const toggleOpen = () => {
        document.getElementsByClassName("SideBar")[0].classList.toggle('SideBarOpen');
        document.getElementsByClassName("SideBarArrow")[0].classList.toggle('Rotate');
        //setTimeout(function (){
            document.getElementsByClassName("Menu")[0].classList.toggle('Hidden');

            //document.getElementsByClassName("menu-option").forEach(e => e.classList.toggle('menu-option-visible'));
        //}, 5000);
    }

    const open = useSelector(state=> state.menuOpen);
    return (
    <div className='SideBar' >
        <div className='Bars' onClick={toggleOpen}>
        <p className="SideBarArrow">&#x2B95;</p>
        </div>
        <div className="Menu Hidden">
            <Link to="/schoolProjects"><p onClick={toggleOpen} className="menu-option">School Projects</p></Link>
            <Link to="/rasterCaster"><p onClick={toggleOpen} className="menu-option">Raster Caster</p></Link>
            <Link to="/Games"><p onClick={toggleOpen} className="menu-option">Games</p></Link>
            <Link to="/hangMan"><p onClick={toggleOpen} className="menu-option">Hangman</p></Link>
            <Link to="/chess"><p onClick={toggleOpen} className="menu-option">Chess</p></Link>
            <Link to="/home"><p onClick={toggleOpen} className="menu-option">Home</p></Link>
        </div>
    </div>
    );
}