import React, { Component } from 'react';

import classes from './MapBoxScreen.module.css';
import MapBox from './MapBox/MapBox';

class MapBoxScreen extends Component {
	render() {
		return (
			<div className={classes.MapBoxScreen}>
				<MapBox />
			</div>
		);
	}
}

export default MapBoxScreen;
