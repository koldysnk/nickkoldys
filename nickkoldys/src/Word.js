import React from 'react';
import './Word.css';

export function Word(props) {
    const word = props.word;

    return (
        <div className="word">
            <h3 className="wordTitle">{word.word}</h3>
            <ul className='wordList'>
                <li className='wordListItem'>ID: {word.id}</li>
                <li className='wordListItem'>Length: {word.length}</li>
                <li className='wordListItem'>Weight: {word.weight}</li>
                <li className='wordListItem'>Difficulty: {word.difficulty}</li>
                <li className='wordListItem'>Won: {word.won}</li>
                <li className='wordListItem'>Played: {word.played}</li>
            </ul>
        </div>
    );
}