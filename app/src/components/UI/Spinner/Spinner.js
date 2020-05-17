import React from 'react';
import classes from './Spinner.module.css';

const Spinner = () => {
	return (
		<div className={classes.LoaderContainer}>
			<p>Loading...</p>
			<div className={classes.loader}></div>
		</div>
	);
};

export default Spinner;
