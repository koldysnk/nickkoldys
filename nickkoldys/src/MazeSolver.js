import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRandomIntInclusive } from './actions';
import './MazeSolver.css';

export function MazeSolver(props) {
    const activePicture = useSelector(state => state.ppActivePicture);
    const choosePicture = useSelector(state => state.ppChoosePicture);

    const [count, setCount] = useState()
    const [errMessage, setErrMessage] = useState('')

    // Use useRef for mutable variables that we want to persist
    // without triggering a re-render on their change
    const maze = useRef([])
    const width = useRef(10)
    const height = useRef(10)
    const goalData = useRef()
    const accuracy = useRef(0)
    const currAccuracy = useRef(0)
    const generations = useRef(0)
    const triangle = useRef({
        aX: 0,
        aY: 0,
        bX: 0,
        bY: 0,
        cX: 0,
        cY: 0,
        r: 0,
        g: 0,
        b: 0,
        a: 0,
    })

    const dispatch = useDispatch();





    const generateMaze = () => {
        let newMaze = []

        for (let i = 0; i < height.current; i++) {
            let row = []
            for (let j = 0; j < width.current; j++) {
                row.push({ sides:getRandomIntInclusive(0,15),visited:false})
            }
            newMaze.push(row)
        }
        maze.current = newMaze
        setCount(1)
    }


    useEffect(() => {
        generateMaze()
    }, [])




    return (
        <div className='MazeSolver' >
            <h2 className='msTitle'>MazeSolver</h2>
            <div className='msBoard'>
                {maze.current.map((w, i) => {
                    return <div>{w.map((v, j) => {
                        let className = 'mazeSquare';

                        if(v.sides & 1){
                            className+= ' msBorderTop'
                        }
                        if(v.sides & 2){
                            className+= ' msBorderRight'
                        }
                        if(v.sides & 4){
                            className+= ' msBorderBottom'
                        }
                        if(v.sides & 8){
                            className+= ' msBorderLeft'
                        }


                        return <div key={`${i}-${j}`} className={className}></div>
                    })}<br/></div>

                })}
            </div>
            <h3 className='descriptionTitle'>Description</h3>
            <p className='descriptionText'>
                The Maze Solver project generates a random maze and gives the user the option
                of solving the maze with a depth first search or a breadth first search. Both
                variations are guaranteed to find a solution if one exists, but a breadth first search is guaranteed
                to find the shortest path.
            </p>
        </div>
    );
}
