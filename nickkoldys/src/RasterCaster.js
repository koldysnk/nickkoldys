import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './rasterCaster.css';
import { VertexArray } from './VertexArray';
import { VertexAttributes } from './VertexAttributes';
import { ShaderProgram } from './ShaderProgram';
import { Matrix4 } from './Matrix4';
import { setRasterCasterCustomFunction, setRasterCasterDisclaimerActive, setRasterCasterExample1Function, setRasterCasterSelection } from './actions';

export function RasterCaster(props) {
    const custom = 'return vec3(1.0,1.0,1.0);';
    const example1 = 'return vec3(sin(gl_FragCoord.x/gl_FragCoord.y), cos(gl_FragCoord.y*gl_FragCoord.x),tan(gl_FragCoord.x*gl_FragCoord.y));';
    const example2 =
        `float x = gl_FragCoord.x-width/2.0;
float y = gl_FragCoord.y-height/2.0;
    
return vec3(cos(x/y),sin(x*y),tan(x*y/7600.0));`
    const example3 =
        `float x = gl_FragCoord.x-width/2.0;
float y = gl_FragCoord.y-height/2.0;

if(x==0.0){
x=1.0;
}
if(y==0.0){
y=1.0;
}
float theta = atan(x/y);
float k = 10.0;

return vec3(cos(k*theta)*cos(theta),cos(k*theta)*sin(theta),tan(x/y*1000.0));`
    const example4 =
        `float x = (gl_FragCoord.x-width/2.0)/(width/20.0);
float y = (gl_FragCoord.y-height/2.0)/(height/8.0);

return vec3(0,cos(x/y),cos(x/y)*sin(x*y));`
    const horizon =
        `float x = gl_FragCoord.x-width/2.0;
float y = gl_FragCoord.y-height/2.0;

if(x==0.0){
    x=1.0;
}
if(y==0.0){
    y=1.0;
}
float theta = atan(y);
float k = 10.0;

return vec3(cos(k*theta)*cos(theta),cos(k*theta)*sin(theta),tan(x/y*10.0));
`
    const rose =
        `float x = (gl_FragCoord.x-width/2.0)/(width/2.0);
float y = (gl_FragCoord.y-height/2.0)/(height/2.0);

if(x==0.0){
    x=1.0;
}
if(y==0.0){
    y=1.0;
}

float theta = atan(y/x);
float k = 9.0;
float xVal = cos(k*theta)*cos(theta);
float yVal = cos(k*theta)*sin(theta);

if(x>=0.0 && y>=0.0){
    if(x<=xVal && y<=yVal){
        return vec3(1,0,0);
    }else{
    return vec3(0,1,0);
    }
}else if(x<0.0 && y>=0.0){
    if(x>=xVal && y<=yVal){
        return vec3(1,0,0);
    }else{
        return vec3(0,1,0);
    }
}else if(x>=0.0 && y<0.0){
    if(x<=xVal && y>=yVal){
        return vec3(1,0,0);
    }else{
        return vec3(0,1,0);
    }
}else if(x<0.0 && y<0.0){
    if(x>=xVal && y>=yVal){
        return vec3(1,0,0);
    }else{
        return vec3(0,1,0);
    }
}`
    const batman =
        `float x = (gl_FragCoord.x-width/2.0)/(width/20.0);
float y = (gl_FragCoord.y-height/2.0)/(height/8.0);

if(x>=-7.0 && x<=-2.775 && y>=0.0){
    if(x>=-7.0*sqrt(1.0-(y*y)/3.0)  ){
        return vec3(1,1,0);
    }
}
if(x>=-7.0 && x<=-3.5 && y<=0.0){
    if(x>=-7.0*sqrt(1.0-(y*y)/3.0)  ){
        return vec3(1,1,0);
    }
}
if(x>=2.775 && x<=7.0 && y>=0.0){
    if(x<=7.0*sqrt(1.0-(y*y)/3.0)  ){
        return vec3(1,1,0);
    }
}
if(x>=3.5 && x<=7.0 && y<=0.0){
    if(x<=7.0*sqrt(1.0-(y*y)/3.0)  ){
        return vec3(1,1,0);
    }
}

if(x>=-3.5 && x<=3.5 && y<=0.0){
    if(y>=(abs(x/2.0)-((3.0*sqrt(33.0)-7.0)/112.0)*x*x-3.0)+sqrt(1.0-(abs(abs(x)-2.0)-1.0)*(abs(abs(x)-2.0)-1.0))){
        return vec3(1,1,0);
    }
}

if(((x>=-2.775 && x<= -1.0) || (x>=1.0 && x<= 2.775))&& y>=0.0){
    if(y<=((6.0*sqrt(10.0)/7.0+(1.5-0.5*abs(x)))-(6.0*sqrt(10.0)/14.0)*sqrt(4.0-(abs(x)-1.0)*(abs(x)-1.0)))){
        return vec3(1,1,0);
    }
}

if(((x>=-1.0 && x<=-0.8) || (x>=0.8 && x<=1.0))  && y>=0.0){
    if(y<=9.0-8.0*abs(x)){
        return vec3(1,1,0);
    }
}

if(((x>=-0.8 && x<=-0.4) || (x>=0.4 && x<=0.8))  && y>=0.0){
    if(y<=2.0*abs(x)+1.15){
        return vec3(1,1,0);
    }
}

if(x>=-0.4 && x<=0.4 && y >=0.0){
    if(y<=1.95){
        return vec3(1,1,0);
    }
}

return vec3(0,0,0);`
    //const [functionValue, setFunctionValue] = useState(custom);
    let functionValue = custom
    const disclaimer = useSelector(state => state.rasterCasterDisclaimerActive)
    const [selection, setSelection] = useState(0);
    const [errorValue, setErrorValue] = useState('');
    const dispatch = useDispatch()

    const setFunctionValue = (value) => {
        const inputF = document.getElementById('input-function');
        inputF.value = value
    }


    const start = (defaultFunc) => {
        const canvas = document.getElementById('rasterCasterCanvas');
        if (!canvas) {
            return;
        }

        const gl = canvas.getContext('webgl2');

        if (!gl) {
            return;
        }

        let shaderProgram;
        let vertexArray;

        function render() {
            gl.clearColor(1, .9, 0, 1);
            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            shaderProgram.bind();
            vertexArray.bind();
            vertexArray.drawSequence(gl.TRIANGLES);
            vertexArray.unbind();
            shaderProgram.unbind();
        }

        function onSizeChanged() {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
            shaderProgram.bind();
            shaderProgram.setUniform1f("width", canvas.width);
            shaderProgram.setUniform1f("height", canvas.height);
            render();
        }

        async function initialize() {
            try {
                const inputF = document.getElementById('input-function');
                let func = !defaultFunc ? inputF.value : defaultFunc
                defaultFunc = null

                const vertexSource = `
        in vec3 position;
        
        void main() {
            gl_PointSize = 10.0;
            gl_Position = vec4(position, 1.0);
        }
        `;

                const fragmentSource = `
        uniform float width;
        uniform float height;
        out vec4 fragmentColor;
        
        vec3 f(){
            ${func}
        }
        
        void main() {
        fragmentColor = vec4(f(), 1.0);
        }
        `;

                shaderProgram = new ShaderProgram(vertexSource, fragmentSource, gl);

                const positions = [
                    -1, 1, 0.0,
                    -1, -1, 0.0,
                    1, -1, 0.0,
                    -1, 1, 0.0,
                    1, -1, 0.0,
                    1, 1, 0.0
                ];

                const attributes = new VertexAttributes(gl);
                attributes.addAttribute('position', 6, 3, positions);
                vertexArray = new VertexArray(shaderProgram, attributes, gl);

                inputF.addEventListener('input', initialize);
                window.addEventListener('resize', onSizeChanged);
                onSizeChanged();
                setErrorValue('')
            } catch (e) {
                console.log(e)
                setErrorValue(e)
            }
        }


        initialize()

    }

    const selectButton0 = () => {
        if (selection != 0) {
            setFunctionValue(custom)
            setSelection(0)
            start(custom)
        }
    }

    const selectButton1 = () => {
        if (selection != 1) {
            setFunctionValue(example1)
            setSelection(1)
            start(example1)
        }
    }

    const selectButton2 = () => {
        if (selection != 2) {
            setFunctionValue(example2)

            setSelection(2)
            start(example2)
        }
    }

    const selectButton3 = () => {
        if (selection != 3) {
            setFunctionValue(example3)
            setSelection(3)
            start(example3)
        }
    }

    const selectButton4 = () => {
        if (selection != 4) {
            setFunctionValue(example4)
            setSelection(4)
            start(example4)
        }
    }

    const selectButton5 = () => {
        if (selection != 5) {
            setFunctionValue(horizon)
            setSelection(5)
            start(horizon)
        }
    }

    const selectButton6 = () => {
        if (selection != 6) {
            setFunctionValue(rose)
            setSelection(6)
            start(rose)
        }
    }

    const selectButton7 = () => {
        if (selection != 7) {
            setFunctionValue(batman)
            setSelection(7)
            start(batman)
        }
    }

    const removeDisclaimer = () => {
        dispatch(setRasterCasterDisclaimerActive(!disclaimer))
    }

    useEffect(() => {
        start()
    }, [dispatch])

    return (
        <div className='RasterCaster'>
            <h2>Raster Caster</h2>
            <div className={`rasterCasterDisclaimer ${!disclaimer ? 'rasterCasterHidden' : ''}`}>
                <p>
                    This page is not optimized for small screens or mobile devices.
                </p>
                <button onClick={removeDisclaimer}>Continue</button>
            </div>
            <div className={`rasterCasterBox ${disclaimer ? 'rasterCasterHidden' : ''}`}>
                <div className="rasterCasterControls">
                    <div className='rasterCasterButtonBox'>
                        <label className='rasterCasterButtonLabel'>
                            <input id='rasterCasterButton_Custom' name='rasterCasterButtons' type='radio' defaultChecked onClick={selectButton0}></input>
                        Blank
                    </label>
                        <label className='rasterCasterButtonLabel'>
                            <input id='rasterCasterButton_Example1' name='rasterCasterButtons' type='radio' onClick={selectButton1}></input>
                        Example 1
                    </label>
                        <label className='rasterCasterButtonLabel'>
                            <input id='rasterCasterButton_Example2' name='rasterCasterButtons' type='radio' onClick={selectButton2}></input>
                        Example 2
                    </label>
                        <label className='rasterCasterButtonLabel'>
                            <input id='rasterCasterButton_Example3' name='rasterCasterButtons' type='radio' onClick={selectButton3}></input>
                        Example 3
                    </label>
                        <label className='rasterCasterButtonLabel'>
                            <input id='rasterCasterButton_Example4' name='rasterCasterButtons' type='radio' onClick={selectButton4}></input>
                        Example 4
                    </label>
                        <label className='rasterCasterButtonLabel'>
                            <input id='rasterCasterButton_Example5' name='rasterCasterButtons' type='radio' onClick={selectButton5}></input>
                        Horizon
                    </label>
                        <label className='rasterCasterButtonLabel'>
                            <input id='rasterCasterButton_Example6' name='rasterCasterButtons' type='radio' onClick={selectButton6}></input>
                        Rose
                    </label>
                        <label className='rasterCasterButtonLabel'>
                            <input id='rasterCasterButton_Example7' name='rasterCasterButtons' type='radio' onClick={selectButton7}></input>
                        Batman
                    </label>
                    </div>
                    <textarea type="text" id="input-function" defaultValue={functionValue} spellCheck="false"></textarea>
                </div>
                <p>{errorValue}</p>
                <canvas id='rasterCasterCanvas'></canvas>
                <h3 className='descriptionTitle'>Description</h3>
                <p className='descriptionText'>
                    By editing the text area above, you can use OpenGL Shading Language (GLSL) to manipulate the fragment shader and 
                    write directly to the GPU. If the canvas is not rendering anything in the above box (the canvas is the 
                    same color as the background), you may need to turn on WebGl in your browser settings. This is especially
                    true if you are using an IOS device. 
                </p>
            </div>
            <script defer src="dist/bundle.js"></script>
        </div>
    );
}