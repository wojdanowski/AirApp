import React from 'react';

import classes from './LocationForm.module.css';
import GeoIcon from './../../UI/GeoIcon/GeoIcon';
import MainButton from './../../UI/Buttons/MainButton/MainButton';

const LocationForm = (props) => {
	return (
		<div className={classes.InputCard}>
			<form>
				<h1>Get info about location</h1>
				<label>
					<div className={classes.InputLabelBox}>
						<input
							className={classes.InputFormField}
							type='text'
							placeholder='Location'
						/>
						<GeoIcon geoIconClicked={props.geoIconClicked} />
					</div>
				</label>
				<MainButton label='get' />
				<MainButton label='show on map' />
			</form>
		</div>
	);
};

export default LocationForm;
