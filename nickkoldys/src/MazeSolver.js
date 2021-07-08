import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRandomIntInclusive } from './actions';
import './MazeSolver.css';
import {useWindowDimensions} from './windowInfo';

export function MazeSolver(props) {
    const activePicture = useSelector(state => state.ppActivePicture);
    const choosePicture = useSelector(state => state.ppChoosePicture);

    const [count, setCount] = useState(0)
    const [errMessage, setErrMessage] = useState('')

    // Use useRef for mutable variables that we want to persist
    // without triggering a re-render on their change
    const { height, width } = useWindowDimensions();
    const maxWidth = Math.floor(width*.8/20)
    const maxHeight = Math.floor(height*.8/20)
    const maze = useRef([])
    const path = useRef([])
    const currWidth = useRef(10)
    const currHeight = useRef(10)

    const dispatch = useDispatch();


    const createMaze = (s) => {
        if(s.length>0){
            let x = s[s.length-1].x
            let y = s[s.length-1].y
            let numSides = (x<(currWidth.current-1) && !maze.current[x+1][y].visited) +
                (x>0 && !maze.current[x-1][y].visited) +
                (y<(currHeight.current-1) && !maze.current[x][y+1].visited) +
                (y>0 && !maze.current[x][y-1].visited) 

            if(numSides){
                let rand = Math.floor(Math.random()*numSides)

                //Right to Left
                if(x<(currWidth.current-1) && !maze.current[x+1][y].visited){
                    if(rand==0){
                        maze.current[x+1][y].visited = true
                        maze.current[x+1][y].l = false
                        maze.current[x][y].r = false
                        s.push(maze.current[x+1][y])
                        createMaze(s)
                    }
                    rand--
                }

                //Top to Bottom
                if(y<(currHeight.current-1) && !maze.current[x][y+1].visited){
                    if(rand==0){
                        maze.current[x][y+1].visited = true
                        maze.current[x][y+1].t = false
                        maze.current[x][y].b = false
                        s.push(maze.current[x][y+1])
                        createMaze(s)
                    }
                    rand--
                }
                
                //Right to Left
                if(x>0 && !maze.current[x-1][y].visited){
                    if(rand==0){
                        maze.current[x-1][y].visited = true
                        maze.current[x-1][y].r = false
                        maze.current[x][y].l = false
                        s.push(maze.current[x-1][y])
                        createMaze(s)
                    }
                    rand--
                }
                
                //Bottom to Top
                if(y>0 && !maze.current[x][y-1].visited){
                    if(rand==0){
                        maze.current[x][y-1].visited = true
                        maze.current[x][y-1].b = false
                        maze.current[x][y].t = false
                        s.push(maze.current[x][y-1])
                        createMaze(s)
                    }
                    rand--
                }
            }else{
                s.pop()
                createMaze(s)
            }
        }
    }


    const initializeMaze = () => {
        let newMaze = []

        for (let i = 0; i < currWidth.current; i++) {
            let row = []
            for (let j = 0; j < currHeight.current; j++) {
                row.push({x:i,y:j, t:true,l:true,r:true,b:true,visited:false})
            }
            newMaze.push(row)
        }
        maze.current = newMaze

        let x = Math.floor(Math.random()*currWidth.current)
        let y = Math.floor(Math.random()*currHeight.current)
        maze.current[x][y].visited = true

        let s = [maze.current[x][y]]
        createMaze(s)
        setCount(prevCount => prevCount +1)
    }


    useEffect(() => {
        initializeMaze()
    }, [])

    const setWidth = (newWidth) => {
        currWidth.current = newWidth
        initializeMaze()
    }

    const setHeight = (newHeight) => {
        currHeight.current = newHeight
        initializeMaze()
    }

    const stepDFS = () => {

    }

    const startDFS = () => {
        cancelAnimationFrame(stepDFS)

        
        requestAnimationFrame(stepDFS)

        
    } // Make sure the effect runs only once

    



    return (
        <div className='MazeSolver' >
            <h2 className='msTitle'>Maze Solver</h2>
            <div>
                <button onClick={initializeMaze}>Generate</button>
            </div>
            <div>
                <label>Width: </label>
                <input type="range" min="10" max={maxWidth} value={currWidth.current} className="slider" onChange={e => setWidth(e.target.value)}></input>
                <label> {currWidth.current}</label>
            </div>
            <div>
                <label>Height: </label>
                <input type="range" min="10" max={maxHeight} value={currHeight.current} className="slider" onChange={e => setHeight(e.target.value)}></input>
                <label> {currHeight.current}</label>
            </div>
            <div className='msBoard'>
                {maze.current.map((w, i) => {
                    return <div key={i}>{w.map((v, j) => {
                        let className = 'mazeSquare';
                        if(v.x==0 &&v.y==0){
                            className+= ' msStart'
                        }else if(v.x==currWidth.current-1 &&v.y==currHeight.current-1){
                            className+= ' msEnd'
                        }

                        if(v.t){
                            className+= ' msBorderTop'
                        }
                        if(v.r){
                            className+= ' msBorderRight'
                        }
                        if(v.b){
                            className+= ' msBorderBottom'
                        }
                        if(v.l){
                            className+= ' msBorderLeft'
                        }

                        if(path.current.includes(`${v.x}-${v.y}`)){
                            return <div key={`${i}-${j}`} className={className}><div className='msDot'></div></div>
                        }

                        return <div key={`${i}-${j}`} className={className}></div>
                    })}<br/></div>

                })}
            </div>
            <h3 className='descriptionTitle'>Description</h3>
            <p className='descriptionText'>
                The Maze Solver project generates a random maze and gives the user the option
                of solving the maze with a depth first search (DFS) or a breadth first search (BFS). Both
                variations are guaranteed to find a solution if one exists, but a breadth first search is guaranteed
                to find the shortest path.
            </p>
        </div>
    );
}
