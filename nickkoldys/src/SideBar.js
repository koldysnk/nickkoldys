import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import './sideBar.css';

export function SideBar(){
    const toggleOpen = () => {
        document.getElementsByClassName("SideBar")[0].classList.toggle('SideBarOpen');
        document.getElementsByClassName("SideBarArrow")[0].classList.toggle('Rotate');
        document.getElementsByClassName("Menu")[0].classList.toggle('Hidden');
        document.getElementsByClassName("SideBarBurger")[0].classList.toggle('Hidden');
        document.getElementsByClassName("SideBarBurger")[1].classList.toggle('Hidden');
        document.getElementsByClassName("App")[0].classList.toggle('Shifted');
    }

    const open = useSelector(state=> state.menuOpen);
    return (
    <div className='SideBar' >
        <div className='Bars' onClick={toggleOpen}>
        <p className="SideBarArrow">&#x2B95;</p>
        <img className='SideBarBurger' src="hamburg.png"></img>
        <img className='SideBarBurger Hidden' src="hamburg2.png"></img>
        </div>
        <div className="Menu Hidden">
            <Link to="/games"><p onClick={toggleOpen} className="menu-option">Games</p></Link>
            <Link to="/projects"><p onClick={toggleOpen} className="menu-option">Projects</p></Link>
            <Link to="/about"><p onClick={toggleOpen} className="menu-option">About</p></Link>
            <Link to="/home"><p onClick={toggleOpen} className="menu-option">Home</p></Link>
        </div>
    </div>
    );
}