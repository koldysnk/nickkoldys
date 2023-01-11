import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

export function NotFound(props) {

    return (
        <div>
            <header className="App-header">
                <p>
                    404 Not Found. This page does not exist.
                </p>
                <p className="App-Link"><Link to="/home">Home</Link></p>
            </header>
        </div>
    );
}