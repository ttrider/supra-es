import React from 'react';
import ISurfaceController from 'src/models/ISurfaceController';
import NoiseWhite from '../surface/noise.white.png';
import SurfaceComponent from './SurfaceComponent';
import { Classes } from './SurfaceContext';


export default class SurfaceDefs extends SurfaceComponent {


    public renderInContext(controller: ISurfaceController, classes: Classes) {

        return (

            <defs>
                <marker id="triangle" viewBox="0 0 10 10"
                    refX="1" refY="5"
                    markerUnits="strokeWidth"
                    markerWidth="5" markerHeight="5"
                    orient="auto">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#f00" />
                </marker>
                <marker id="target-arrow" viewBox="0 0 10 10" refX="4" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M9,5 l-8,-4 l3,4 l-3,4 l8,-4 z" className="join-connector-marker" />
                </marker>

                <marker id="source-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="5" orient="auto">
                    <circle cx="8" cy="5" r="2" stroke="black" fill="none" strokeWidth="2" />
                </marker>


                <pattern id="noisewhite" width={113 / controller.viewRatio} height={91 / controller.viewRatio} patternContentUnits="userSpaceOnUse" patternUnits="userSpaceOnUse" viewBox="0 0 113 91">
                    <image href={NoiseWhite} x="0" y="0" width="113" height="91" />
                </pattern>

                <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="0%" className={classes.gradientGreen}>

                    <stop offset="0%" className="step01" />
                    <stop offset="80%" className="step02" />
                    <stop offset="100%" className="step03" />
                </linearGradient>

                <filter id="dropShadow">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="20" result="DROP" />
                    <feOffset in="SHADOW" dx="8" dy="0" result="DROPSHADOW" />


                    <feComponentTransfer in="DROPSHADOW" result="FINALSHADOW">
                        <feFuncA type="table" tableValues="0 0.7" />
                    </feComponentTransfer>


                    <feMerge>
                        <feMergeNode in="FINALSHADOW" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>

            </defs>


        );


    }
}
