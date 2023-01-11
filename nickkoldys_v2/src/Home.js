import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

export function Home(props) {

    return (
        <div>
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