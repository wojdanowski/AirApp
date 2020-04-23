import React from 'react';

import classes from './LocationForm.module.css';
import GeoIcon from './../../UI/GeoIcon/GeoIcon';
import MainButton from './../../UI/Buttons/MainButton/MainButton';

const LocationForm = (props) => {
	return (
		<div className={classes.InputCard}>
			<form>
				<h1>
					<strong
						style={{
							fontSize: '40px',
							textTransform: 'uppercase',
							color: '#ae1100',
						}}
					>
						jakość powietrza
					</strong>
					<br />w twojej okolicy
				</h1>
				<label>
					<div className={classes.InputLabelBox}>
						<input
							className={classes.InputFormField}
							type='text'
							placeholder='Lokalizacja'
							onChange={(event) => {
								props.changeHandler(event.target.value);
							}}
						/>
						<GeoIcon geoIconClicked={props.geoIconClicked} />
					</div>
				</label>
				<MainButton label='Subskrybuj lokalizację' />
				<MainButton label='pokaż na mapie' />
			</form>
		</div>
	);
};

export default LocationForm;
