import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRandomIntInclusive } from './actions';
import './MazeSolver.css';
import { useWindowDimensions } from './windowInfo';

export function MazeSolver(props) {
    const activePicture = useSelector(state => state.ppActivePicture);
    const choosePicture = useSelector(state => state.ppChoosePicture);

    const [count, setCount] = useState(0)
    const [errMessage, setErrMessage] = useState('')

    // Use useRef for mutable variables that we want to persist
    // without triggering a re-render on their change
    const { height, width } = useWindowDimensions();
    const maxWidth = Math.floor(width * .8 / 20)
    const maxHeight = Math.floor(height * .8 / 20)
    const maze = useRef([])
    const evaluationOrder = useRef([])
    const path = useRef([])
    const displayPath = useRef([])
    const currWidth = useRef(10)
    const currHeight = useRef(10)
    const robot = useRef({ x: 0, y: 0 })
    const completed = useRef(false)
    const bfsActive = useRef(false)
    const started = useRef(false)
    const requestID = useRef()

    const dispatch = useDispatch();


    const createMaze = (s) => {
        if (s.length > 0) {
            let x = s[s.length - 1].x
            let y = s[s.length - 1].y
            let numSides = (x < (currWidth.current - 1) && !maze.current[x + 1][y].visited) +
                (x > 0 && !maze.current[x - 1][y].visited) +
                (y < (currHeight.current - 1) && !maze.current[x][y + 1].visited) +
                (y > 0 && !maze.current[x][y - 1].visited)

            if (numSides) {
                let rand = Math.floor(Math.random() * numSides)

                //Right to Left
                if (x < (currWidth.current - 1) && !maze.current[x + 1][y].visited) {
                    if (rand == 0) {
                        maze.current[x + 1][y].visited = true
                        maze.current[x + 1][y].l = false
                        maze.current[x][y].r = false
                        s.push(maze.current[x + 1][y])
                        createMaze(s)
                    }
                    rand--
                }

                //Top to Bottom
                if (y < (currHeight.current - 1) && !maze.current[x][y + 1].visited) {
                    if (rand == 0) {
                        maze.current[x][y + 1].visited = true
                        maze.current[x][y + 1].t = false
                        maze.current[x][y].b = false
                        s.push(maze.current[x][y + 1])
                        createMaze(s)
                    }
                    rand--
                }

                //Right to Left
                if (x > 0 && !maze.current[x - 1][y].visited) {
                    if (rand == 0) {
                        maze.current[x - 1][y].visited = true
                        maze.current[x - 1][y].r = false
                        maze.current[x][y].l = false
                        s.push(maze.current[x - 1][y])
                        createMaze(s)
                    }
                    rand--
                }

                //Bottom to Top
                if (y > 0 && !maze.current[x][y - 1].visited) {
                    if (rand == 0) {
                        maze.current[x][y - 1].visited = true
                        maze.current[x][y - 1].b = false
                        maze.current[x][y].t = false
                        s.push(maze.current[x][y - 1])
                        createMaze(s)
                    }
                    rand--
                }
            } else {
                s.pop()
                createMaze(s)
            }
        }
    }


    const initializeMaze = () => {
        bfsActive.current = false
        displayPath.current = []
        let newMaze = []

        for (let i = 0; i < currWidth.current; i++) {
            let row = []
            for (let j = 0; j < currHeight.current; j++) {
                row.push({ x: i, y: j, t: true, l: true, r: true, b: true, visited: false, path: false, past: false })
            }
            newMaze.push(row)
        }
        maze.current = newMaze

        let x = Math.floor(Math.random() * currWidth.current)
        let y = Math.floor(Math.random() * currHeight.current)
        maze.current[x][y].visited = true

        let s = [maze.current[x][y]]
        createMaze(s)
        setCount(prevCount => prevCount + 1)
    }


    useEffect(() => {
        initializeMaze()
    }, [])

    const setWidth = (newWidth) => {
        cancelAnimationFrame(requestID.current)
        currWidth.current = newWidth
        started.current = false
        initializeMaze()
    }

    const setHeight = (newHeight) => {
        cancelAnimationFrame(requestID.current)
        currHeight.current = newHeight
        started.current = false
        initializeMaze()
    }

    const downStepDFS = () => {
        if (started.current && !bfsActive.current) {

            setCount(prevCount => (prevCount + 1));
            let { x, y } = path.current.pop()
            maze.current[x][y].path = false
            maze.current[x][y].past = true

            x = path.current[path.current.length - 1].x
            y = path.current[path.current.length - 1].y

            if (!maze.current[x][y].t && y > 0 && !maze.current[x][y - 1].visited
                || !maze.current[x][y].r && x < currWidth.current - 1 && !maze.current[x + 1][y].visited
                || !maze.current[x][y].b && y < currHeight.current - 1 && !maze.current[x][y + 1].visited
                || !maze.current[x][y].l && x > 0 && !maze.current[x - 1][y].visited) {

                requestID.current = requestAnimationFrame(stepDFS)
            } else {
                requestID.current = requestAnimationFrame(downStepDFS)
            }


        }
    }

    const stepDFS = () => {
        if (started.current && !bfsActive.current) {

            setCount(prevCount => (prevCount + 1));

            if (!completed.current) {

                let x = evaluationOrder.current[0].x
                let y = evaluationOrder.current[0].y

                evaluationOrder.current.shift()
                path.current.push({ x: x, y: y })

                maze.current[x][y].path = true
                maze.current[x][y].visited = true

                if (x == currWidth.current - 1 && y == currHeight.current - 1) {
                    completed.current = true


                    requestID.current = requestAnimationFrame(stepDFS)
                } else {
                    let paths = []
                    if (!maze.current[x][y].t && y > 0 && !maze.current[x][y - 1].visited) {
                        paths.push({ x: x, y: y - 1 })
                    }

                    if (!maze.current[x][y].r && x < currWidth.current - 1 && !maze.current[x + 1][y].visited) {
                        paths.push({ x: x + 1, y: y })
                    }

                    if (!maze.current[x][y].b && y < currHeight.current - 1 && !maze.current[x][y + 1].visited) {
                        paths.push({ x: x, y: y + 1 })
                    }

                    if (!maze.current[x][y].l && x > 0 && !maze.current[x - 1][y].visited) {
                        paths.push({ x: x - 1, y: y })
                    }

                    if (paths.length > 0) {
                        evaluationOrder.current.unshift(...paths)

                        requestID.current = requestAnimationFrame(stepDFS)
                    } else {
                        requestID.current = requestAnimationFrame(downStepDFS)
                    }
                }
            }
        }
    }

    const startDFS = () => {
        cancelAnimationFrame(requestID.current)

        robot.current = { x: 0, y: 0 }
        completed.current = false
        maze.current = maze.current.map(w => {
            return w.map(v => {
                v.visited = false
                v.path = false
                v.past = false

                return v
            })
        })
        evaluationOrder.current = [{ x: 0, y: 0 }]
        path.current = []
        bfsActive.current = false
        started.current = true

        requestID.current = requestAnimationFrame(stepDFS)


    } // Make sure the effect runs only once


    const downStepBFS = () => {
        if (started.current && bfsActive.current) {

            setCount(prevCount => (prevCount + 1));
            let spot = displayPath.current.pop().split('-')
            let x = parseInt(spot[0])
            let y = parseInt(spot[1])

            maze.current[x][y].path = false
            maze.current[x][y].past = true

            x = parseInt(displayPath.current[displayPath.current.length - 1].split('-')[0])
            y = parseInt(displayPath.current[displayPath.current.length - 1].split('-')[1])


            if ((x != 0 || y != 0) && ((!maze.current[x][y].t && y > 0 && !maze.current[x][y - 1].past)
                + (!maze.current[x][y].r && x < currWidth.current - 1 && !maze.current[x + 1][y].past)
                + (!maze.current[x][y].b && y < currHeight.current - 1 && !maze.current[x][y + 1].past)
                + (!maze.current[x][y].l && x > 0 && !maze.current[x - 1][y].past)) < 2) {

                requestID.current = requestAnimationFrame(downStepBFS)
            } else {
                requestID.current = requestAnimationFrame(stepBFS)
            }

        }
    }

    const stepBFS = () => {
        if (started.current && bfsActive.current) {

            setCount(prevCount => (prevCount + 1));

            if (!completed.current) {

                let currPath = path.current.shift()
                displayPath.current = currPath

                let x = parseInt(currPath[currPath.length - 1].split('-')[0])
                let y = parseInt(currPath[currPath.length - 1].split('-')[1])

                maze.current[x][y].path = true
                maze.current[x][y].visited = true

                if (x == currWidth.current - 1 && y == currHeight.current - 1) {
                    completed.current = true


                    requestID.current = requestAnimationFrame(stepBFS)
                } else {
                    let paths = []
                    if (!maze.current[x][y].t && y > 0 && !maze.current[x][y - 1].visited) {
                        paths.push([...currPath, `${x}-${y - 1}`])
                    }

                    if (!maze.current[x][y].r && x < currWidth.current - 1 && !maze.current[x + 1][y].visited) {
                        paths.push([...currPath, `${x + 1}-${y}`])
                    }

                    if (!maze.current[x][y].b && y < currHeight.current - 1 && !maze.current[x][y + 1].visited) {
                        paths.push([...currPath, `${x}-${y + 1}`])
                    }

                    if (!maze.current[x][y].l && x > 0 && !maze.current[x - 1][y].visited) {
                        paths.push([...currPath, `${x - 1}-${y}`])
                    }

                    if (paths.length > 0) {
                        path.current.push(...paths)

                        requestID.current = requestAnimationFrame(stepBFS)
                    } else {
                        requestID.current = requestAnimationFrame(downStepBFS)
                    }
                }
            }
        }
    }

    const startBFS = () => {
        cancelAnimationFrame(requestID.current)

        robot.current = { x: 0, y: 0 }
        completed.current = false
        maze.current = maze.current.map(w => {
            return w.map(v => {
                v.visited = false
                v.path = false
                v.past = false

                return v
            })
        })
        evaluationOrder.current = [{ x: 0, y: 0 }]
        path.current = [['0-0']]
        displayPath.current = ['0-0']
        started.current = true
        bfsActive.current = true

        requestID.current = requestAnimationFrame(stepBFS)


    } // Make sure the effect runs only once





    return (
        <div className='MazeSolver' >
            <h2 className='msTitle'>Maze Solver</h2>
            <div>
                <button onClick={initializeMaze}>Generate</button>
                <button onClick={startDFS}>DFS</button>
                <button onClick={startBFS}>BFS</button>
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
                        if (v.x == 0 && v.y == 0) {
                            className += ' msStart'
                        } else if (v.x == currWidth.current - 1 && v.y == currHeight.current - 1) {
                            className += ' msEnd'
                        }

                        if (v.t) {
                            className += ' msBorderTop'
                        }
                        if (v.r) {
                            className += ' msBorderRight'
                        }
                        if (v.b) {
                            className += ' msBorderBottom'
                        }
                        if (v.l) {
                            className += ' msBorderLeft'
                        }

                        if (started.current) {
                            if (bfsActive.current) {
                                if (displayPath.current.includes(`${v.x}-${v.y}`)) {
                                    return <div key={`${i}-${j}`} className={className}><div className='msDot'></div></div>
                                }

                                if (v.path) {
                                    return <div key={`${i}-${j}`} className={className}><div className='msHalfDot'></div></div>
                                } else if (v.past) {
                                    return <div key={`${i}-${j}`} className={className}><div className='msPast'></div></div>
                                }
                            }

                            if (v.path) {
                                return <div key={`${i}-${j}`} className={className}><div className='msDot'></div></div>
                            } else if (v.past) {
                                return <div key={`${i}-${j}`} className={className}><div className='msPast'></div></div>
                            }
                        }



                        return <div key={`${i}-${j}`} className={className}></div>
                    })}<br /></div>

                })}
            </div>
            <h3 className='descriptionTitle'>Description</h3>
            <p className='descriptionText'>
                The Maze Solver project generates a random maze and gives the user the option
                of solving the maze with a depth first search (DFS) or a breadth first search (BFS). Both
                variations are guaranteed to find a solution if one exists, but a breadth first search is guaranteed
                to find the shortest path. The current path is represented by solid dots and squares that have been searched
                but lead to a dead-end are represented by hollow dots. During a BFS the light dots represent a node that has
                been searched but is not on the current path.
            </p>
        </div>
    );
}
