import React from 'react';
import { Link } from 'react-router-dom';
import './Projects.css';

export function Projects(props) {

    return (
        <div className='Projects'>
            <Link to='/raster_caster'>
            <div className="projectTile rasterCasterTile">
                <h2 className='projectTileTitle rasterCasterTileTitle'>Raster Caster</h2>
                <p className='projectTileText rasterCasterTileText'>Write code in OpenGL Shading Language (GLSL) to manipulate a canvas. (Coming Soon)</p>
            </div>
            </Link>
            <div className="projectTile mazeSolverTile">
                <h2 className='projectTileTitle mazeSolverTileTitle'>Maze Solver</h2>
                <p className='projectTileText mazeSolverTileText'>Generate random mazes then then watch a depth first search solve the maze. (Coming Soon)</p>
            </div>
            <div className="projectTile sortingAlgorithmsTile">
                <h2 className='projectTileTitle sortingAlgorithmsTileTitle'>Sorting Algorithms Visualizations</h2>
                <p className='projectTileText sortingAlgorithmsTileText'>Watch various sorting algorithms sort data. (Coming Soon)</p>
            </div>
        </div>
    );
}