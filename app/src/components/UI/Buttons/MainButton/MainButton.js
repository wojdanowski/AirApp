import React from 'react';

import classes from './MainButton.module.css';

const MainButton = (props) => {
	return (
		<div className={classes.ButtonWrapper}>
			<button
				className={classes.Red}
				type='button'
				onClick={props.clicked}
			>
				{props.label}
			</button>
		</div>
	);
};

export default MainButton;
