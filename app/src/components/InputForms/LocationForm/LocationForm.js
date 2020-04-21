import React from 'react';
import classes from './LocationForm.module.css';

const LocationForm = (props) => {
	return (
		<div className={classes.InputCard}>
			<form>
				<div className={classes.Segment}>
					<h1>Get info about location</h1>
				</div>
				<label>
					<input type='text' placeholder='Location' />
				</label>
				<button className={classes.Red} type='button'>
					<i className={classes.Icon}></i> GET
				</button>
				<div className={classes.Segment}>
					<button className={classes.Red} type='button'>
						<i className={classes.Icon}></i> SHOW ON MAP
					</button>
				</div>
			</form>
		</div>
	);
};

export default LocationForm;
