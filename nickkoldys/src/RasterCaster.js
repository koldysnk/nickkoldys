import React from 'react';
import { Link } from 'react-router-dom';
import './rasterCaster.css';
// import { VertexArray } from './VertexArray';
// import { VertexAttributes } from './VertexAttributes';
// import { ShaderProgram } from './ShaderProgram';
// import { Matrix4 } from './Matrix4';

export function RasterCaster(props) {
    // const start = () => {
    //     const canvas = document.getElementById('rasterCasterCanvas');
    //     window.gl = canvas.getContext('webgl2');

    //     let shaderProgram;
    //     let vertexArray;

    //     function render() {
    //         gl.clearColor(1, .9, 0, 1);
    //         gl.viewport(0, 0, canvas.width, canvas.height);
    //         gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    //         shaderProgram.bind();
    //         vertexArray.bind();
    //         vertexArray.drawSequence(gl.TRIANGLES);
    //         vertexArray.unbind();
    //         shaderProgram.unbind();
    //     }

    //     function onSizeChanged() {
    //         canvas.width = canvas.clientWidth;
    //         canvas.height = canvas.clientHeight;
    //         shaderProgram.bind();
    //         shaderProgram.setUniform1f("width", canvas.width);
    //         shaderProgram.setUniform1f("height", canvas.height);
    //         render();
    //     }

    //     async function initialize() {

    //         let mat1 = new Matrix4();
    //         let mat2 = new Matrix4();
    //         for (let i = 0; i < 16; i++) {
    //             mat1.elements[i] = 0;
    //             mat2.elements[i] = 0;
    //         }
    //         mat1.elements[0] = -1;
    //         mat1.elements[5] = -1;
    //         mat1.elements[15] = 1;
    //         mat1.elements[10] = 1;

    //         mat2.elements[0] = 1;
    //         mat2.elements[5] = 1;
    //         mat2.elements[15] = 1;
    //         mat2.elements[10] = 1;
    //         mat2.elements[12] = 1;
    //         mat2.elements[13] = 2;
    //         mat2.elements[14] = 3;
    //         console.log(mat1.multiplyMatrix4(mat2));

    //         const inputF = document.getElementById('input-function');
    //         let func = inputF.value
    //         console.log(func);
    //         const vertexSource = `
    // in vec3 position;
    
    // void main() {
    //     gl_PointSize = 10.0;
    //     gl_Position = vec4(position, 1.0);
    // }
    // `;

    //         const fragmentSource = `
    // uniform float width;
    // uniform float height;
    // out vec4 fragmentColor;
    
    // vec3 f(){
    //     //float width = ${canvas.clientWidth.toFixed(4)};
    //     //float height = ${canvas.clientHeight.toFixed(4)};
    //     ${func}
    // }
    
    // void main() {
    // fragmentColor = vec4(f(), 1.0);
    // }
    // `;

    //         shaderProgram = new ShaderProgram(vertexSource, fragmentSource);





    //         const positions = [
    //             -1, 1, 0.0,
    //             -1, -1, 0.0,
    //             1, -1, 0.0,
    //             -1, 1, 0.0,
    //             1, -1, 0.0,
    //             1, 1, 0.0
    //         ];


    //         const attributes = new VertexAttributes();
    //         attributes.addAttribute('position', 6, 3, positions);
    //         vertexArray = new VertexArray(shaderProgram, attributes);

    //         render()


    //         inputF.addEventListener('input', initialize);


    //         window.addEventListener('resize', onSizeChanged);
    //         onSizeChanged();
    //     }

    //     initialize()
    // }
    return (
        <div className='RasterCaster'>
            <h2>Raster Caster</h2>
            <div class="controls">
                <label for="input-function">Function</label>
                <textarea type="text" id="input-function">return vec3(1,0,0);</textarea>
            </div>
            <p className='rasterCasterDisclaimer'></p>
            <div id='rasterCasterCanvas'></div>
            <script defer src="dist/bundle.js"></script>
        </div>
    );
}