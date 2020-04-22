import React from 'react';

import classes from './MainButton.module.css';

const MainButton = (props) => {
	return (
		<div className={classes.ButtonWraper}>
			<button className={classes.Red} type='button'>
				{props.label}
			</button>
		</div>
	);
};

export default MainButton;
