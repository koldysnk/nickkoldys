import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRandomIntInclusive } from './actions';
import './MazeSolver.css';

export function MazeSolver(props) {
    const activePicture = useSelector(state => state.ppActivePicture);
    const choosePicture = useSelector(state => state.ppChoosePicture);

    const [count, setCount] = useState(0)
    const [errMessage, setErrMessage] = useState('')

    // Use useRef for mutable variables that we want to persist
    // without triggering a re-render on their change
    const maze = useRef([])
    const width = useRef(30)
    const height = useRef(30)

    const dispatch = useDispatch();


    const createMaze = (s) => {
        if(s.length>0){
            let x = s[s.length-1].x
            let y = s[s.length-1].y
            let numSides = (y<(width.current-1) && !maze.current[y+1][x].visited) +
                (y>0 && !maze.current[y-1][x].visited) +
                (x<(height.current-1) && !maze.current[y][x+1].visited) +
                (x>0 && !maze.current[y][x-1].visited) 

            if(numSides){
                let rand = Math.floor(Math.random()*numSides)

                //Right to Left
                if(y<(width.current-1) && !maze.current[y+1][x].visited){
                    if(rand==0){
                        maze.current[y+1][x].visited = true
                        maze.current[y+1][x].l = false
                        maze.current[y][x].r = false
                        s.push(maze.current[y+1][x])
                        createMaze(s)
                    }
                    rand--
                }

                //Top to Bottom
                if(x<(height.current-1) && !maze.current[y][x+1].visited){
                    if(rand==0){
                        maze.current[y][x+1].visited = true
                        maze.current[y][x+1].t = false
                        maze.current[y][x].b = false
                        s.push(maze.current[y][x+1])
                        createMaze(s)
                    }
                    rand--
                }
                
                //Right to Left
                if(y>0 && !maze.current[y-1][x].visited){
                    if(rand==0){
                        maze.current[y-1][x].visited = true
                        maze.current[y-1][x].r = false
                        maze.current[y][x].l = false
                        s.push(maze.current[y-1][x])
                        createMaze(s)
                    }
                    rand--
                }
                
                //Bottom to Top
                if(x>0 && !maze.current[y][x-1].visited){
                    if(rand==0){
                        maze.current[y][x-1].visited = true
                        maze.current[y][x-1].b = false
                        maze.current[y][x].t = false
                        s.push(maze.current[y][x-1])
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

        for (let i = 0; i < width.current; i++) {
            let row = []
            for (let j = 0; j < height.current; j++) {
                row.push({x:j,y:i, t:true,l:true,r:true,b:true,visited:false})
            }
            newMaze.push(row)
        }
        maze.current = newMaze

        let x = Math.floor(Math.random()*width.current)
        let y = Math.floor(Math.random()*height.current)
        maze.current[x][y].visited = true

        let s = [maze.current[x][y]]
        createMaze(s)
        setCount(prevCount => prevCount +1)
    }


    useEffect(() => {
        initializeMaze()
    }, [])




    return (
        <div className='MazeSolver' >
            <h2 className='msTitle'>MazeSolver</h2>
            <div>
                <button onClick={initializeMaze}>Generate</button>
            </div>
            <div className='msBoard'>
                {maze.current.map((w, i) => {
                    return <div key={i}>{w.map((v, j) => {
                        let className = 'mazeSquare';

                        if(v.x==0 &&v.y==0){
                            className+= ' msStart'
                        }else if(v.x==width.current-1 &&v.y==height.current-1){
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
