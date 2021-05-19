import React from 'react';
import {useDispatch, useSelector } from 'react-redux';
import {tttTakeTurn} from './actions';
import './HangmanDrawing.css';

export function HangmanDrawing(props) {
    const lives = props.lives;

    let drawing = <xmp className="hangmanDrawingXMP">
+----------+<br></br>
|          |<br></br>
|          |<br></br>
|         (X)<br></br>
|         /|\<br></br>
|        / | \<br></br>
|         / \<br></br>
|        /   \<br></br>
|<br></br>
|<br></br>
+--------------+<br></br>
|              |<br></br>
+--------------+<br></br>
    </xmp>

if(lives == 0){
    drawing = <xmp className="hangmanDrawingXMP">
+----------+<br></br>
|          |<br></br>
|          |<br></br>
|         ( )<br></br>
|         /|\<br></br>
|        / | \<br></br>
|         / \<br></br>
|        /   \<br></br>
|<br></br>
|<br></br>
+--------------+<br></br>
|              |<br></br>
+--------------+<br></br>
    </xmp>

}else if(lives==1){
    drawing = <xmp className="hangmanDrawingXMP">
+----------+<br></br>
|          |<br></br>
|          |<br></br>
|         ( )<br></br>
|         /|\<br></br>
|        / | \<br></br>
|         /<br></br>
|        /<br></br>
|<br></br>
|<br></br>
+--------------+<br></br>
|              |<br></br>
+--------------+<br></br>
    </xmp>
}else if(lives==2){
    drawing = <xmp className="hangmanDrawingXMP">
+----------+<br></br>
|          |<br></br>
|          |<br></br>
|         ( )<br></br>
|         /|\<br></br>
|        / | \<br></br>
|<br></br>
|<br></br>
|<br></br>
|<br></br>
+--------------+<br></br>
|              |<br></br>
+--------------+<br></br>
    </xmp>

}else if(lives==3){
    drawing = <xmp className="hangmanDrawingXMP">
+----------+<br></br>
|          |<br></br>
|          |<br></br>
|         ( )<br></br>
|         /|<br></br>
|        / |<br></br>
|<br></br>
|<br></br>
|<br></br>
|<br></br>
+--------------+<br></br>
|              |<br></br>
+--------------+<br></br>
    </xmp>

}else if(lives==4){
    drawing = <xmp className="hangmanDrawingXMP">
+----------+<br></br>
|          |<br></br>
|          |<br></br>
|         ( )<br></br>
|          |<br></br>
|          |<br></br>
|<br></br>
|<br></br>
|<br></br>
|<br></br>
+--------------+<br></br>
|              |<br></br>
+--------------+<br></br>
    </xmp>

}else if(lives==5){
    drawing = <xmp className="hangmanDrawingXMP">
+----------+<br></br>
|          |<br></br>
|          |<br></br>
|         ( )<br></br>
|<br></br>
|<br></br>
|<br></br>
|<br></br>
|<br></br>
|<br></br>
+--------------+<br></br>
|              |<br></br>
+--------------+<br></br>
    </xmp>

}else if(lives==6){
    drawing = <xmp className="hangmanDrawingXMP">
+----------+<br></br>
|          |<br></br>
|          |<br></br>
|<br></br>
|<br></br>
|<br></br>
|<br></br>
|<br></br>
|<br></br>
|<br></br>
+--------------+<br></br>
|              |<br></br>
+--------------+<br></br>
    </xmp>

}else if(lives==7){
    drawing = <xmp className="hangmanDrawingXMP">
+----------+<br></br>
|<br></br>
|<br></br>
|<br></br>
|<br></br>
|<br></br>
|<br></br>
|<br></br>
|<br></br>
|<br></br>
+--------------+<br></br>
|              |<br></br>
+--------------+<br></br>
    </xmp>

}else if(lives==8){
    drawing = <xmp className="hangmanDrawingXMP">
+<br></br>
|<br></br>
|<br></br>
|<br></br>
|<br></br>
|<br></br>
|<br></br>
|<br></br>
|<br></br>
|<br></br>
+--------------+<br></br>
|              |<br></br>
+--------------+<br></br>
    </xmp>

}else if(lives==9){
    drawing = <xmp className="hangmanDrawingXMP">
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
+--------------+<br></br>
|              |<br></br>
+--------------+<br></br>
    </xmp>

}else if(lives==10){
    drawing = <xmp className="hangmanDrawingXMP">
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
    </xmp>

}

    return (
        <div className='HangmanDrawing'>
            {drawing}
        </div>
    );
}