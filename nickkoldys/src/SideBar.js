import React from 'react';
import {Link} from 'react-router-dom';
import './App.css';
import {useSelector,useDispatch} from 'react-redux';

export function SideBar(){
    const toggleOpen = () => {
        document.getElementsByClassName("SideBar")[0].classList.toggle('SideBarOpen');
        document.getElementsByClassName("SideBarArrow")[0].classList.toggle('Rotate');
        //setTimeout(function (){
            document.getElementsByClassName("Menu")[0].classList.toggle('Hidden');
        //}, 5000);
    }

    const open = useSelector(state=> state.menuOpen);
    return (
    <div className='SideBar' >
        <div className='Bars' onClick={toggleOpen}>
        <p className="SideBarArrow">&#x2B95;</p>
        </div>
        <div className="Menu Hidden">
            <Link to="/schoolProjects"><p className="menu-option">School Projects</p></Link>
            <Link to="/rasterCaster"><p className="menu-option">Raster Caster</p></Link>
            <Link to="/Games"><p className="menu-option">Games</p></Link>
            <Link to="/hangMan"><p className="menu-option">Hangman</p></Link>
            <Link to="/chess"><p className="menu-option">Chess</p></Link>
            <Link to="/home"><p className="menu-option">Home</p></Link>
        </div>
    </div>
    );
}