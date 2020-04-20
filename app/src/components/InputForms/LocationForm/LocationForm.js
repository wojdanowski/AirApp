import React from 'react';
import classes from '../InputForms.module.css';

const LocationForm = props => {
	return (
		<form>
			<div className={classes.segment}>
				<h1>Get info about location</h1>
			</div>
			<label>
				<input type='text' placeholder='Location' />
			</label>
			<button className={classes.red} type='button'>
				<i className={classes.icon}></i> GET
			</button>
			<div className={classes.segment}>
				<button className={classes.red} type='button'>
					<i className={classes.icon}></i> SHOW ON MAP
				</button>
			</div>
		</form>
	);
};

export default LocationForm;
