import React, {useEffect}  from 'react';
import {useSelector,useDispatch} from 'react-redux';
import './HangmanDictionary.css';
import {loadAllWords, pageLeft, pageRight} from './actions';
import { Spinner } from './Spinner';
import { Word } from './Word';

export function HangmanDictionary(props) {
    const dictionary = useSelector(state=> state.dictionary);
    const currPage = useSelector(state => state.currPage);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadAllWords(currPage));
    }, [dispatch, currPage]);


    const pLeft = () => {
        dispatch(pageLeft(currPage));
    }

    const pRight = () => {
        dispatch(pageRight(currPage));
    }
    
    let loading = <br></br>;
    if (dictionary.length<1){
        loading = <Spinner />;
    }

    return (
        <div className='HangmanDictionary'>
            <div className="dictionaryHeader">
                <h1>Dictionary</h1>
                <p>This list contains all of the valid words.<br></br>(Definitions Coming Soon)</p>
                <button className='dictionaryButton'onClick={pLeft}>&#8592;</button>
                <button className='dictionaryButton'onClick={pRight}>&#8594;</button>
            </div>
            <div className="dictionaryContent">
                {dictionary.map(word => <Word key={word.id} word={word} />)}
                {loading}
            </div>
            <div className="dictionaryFooter">
                <button className='dictionaryButton'onClick={pLeft}>&#8592;</button>
                <button className='dictionaryButton'onClick={pRight}>&#8594;</button>
            </div>
        </div>
    );
}