// ARROW TYPES:
// <div class="button-up"></div>
// <div class="button-down"></div>
// <div class="arrow-right"></div>
// <div class="arrow-left"></div>
// <div class="long-arrow-right"></div>
// <div class="long-arrow-left"></div>
// <div class="triangle-bottom"></div>
// <div class="triangle-top"></div>
// <div class="triangle-right"></div>
// <div class="triangle-left"></div>

import React from 'react';
import './Arrows.css';

const Arrow = (props) => {
	return (
		<div className='arrowContainer' onClick={props.clicked}>
			<div className={`${props.arrowType} ${props.float}`}></div>
		</div>
	);
};

export default Arrow;
