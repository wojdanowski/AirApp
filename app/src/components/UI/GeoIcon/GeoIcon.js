import React from 'react';

import geoIconImage from '../../../assets/my-location-icon-png-1.png';
import classes from './GeoIcon.module.css';

const GeoIcon = (props) => {
	return (
		<div className={classes.GeoIcon} onClick={props.geoIconClicked}>
			<img src={geoIconImage} alt='GeoIcon' />
		</div>
	);
};

export default GeoIcon;
