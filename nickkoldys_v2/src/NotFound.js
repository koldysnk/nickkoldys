import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

export function NotFound(props) {

    return (
        <div>
            <header className="App-header">
            <iframe frameborder="0" src="https://itch.io/embed-upload/9573598?color=ffffff" allowfullscreen="" width="1152" height="668"><a href="https://nkoldys.itch.io/schmearple">Play Schmearple on itch.io</a></iframe>
                <p>
                    404 Not Found. This page does not exist.
                </p>
                <p className="App-Link"><Link to="/home">Home</Link></p>
            </header>
        </div>
    );
}