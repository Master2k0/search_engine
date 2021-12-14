import React, {useRef, useEffect} from 'react';
import './Canvas.css'
import paint from './paintCanvas.js'

function Canvas(props) {
    const canvasRef = useRef(null);
    useEffect(()=>{
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        let dots = []
        
        const DOT = {
            color: "rgb(256,256,256,0.7)",
            colorLine: "rgb(256,256,256,0.5)",
            count: 40,
            vX: 3,
            vY: 3,
            range: 150
        };
        
        const H = canvas.offsetHeight;
        const W = canvas.offsetWidth;
        canvas.width = W;
        canvas.height = H;
        const gradient = context.createLinearGradient(0, 0, W, H);
        gradient.addColorStop(0, "#F68B0F");
        gradient.addColorStop(0.2, "#FF6843");
        gradient.addColorStop(0.4, "#FF4376");
        gradient.addColorStop(0.6, "#FF33AE");
        gradient.addColorStop(0.8, "#EC4EE7");



        paint(context, DOT, H, W, dots, gradient);
    },[])

   
    return (
            <canvas id="canvas" ref={canvasRef} {...props} />
    );
}

export default Canvas;