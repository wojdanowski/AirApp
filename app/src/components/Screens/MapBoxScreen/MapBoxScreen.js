import React, { Component } from 'react';

import classes from './MapBoxScreen.module.css';
import MapBox from './MapBox/MapBox';

class MapBoxScreen extends Component {
	render() {
		return (
			<div className={classes.MapBoxScreen} ref={this.props.refProp}>
				<MapBox
					selectedCoordinates={this.props.selectedCoordinates}
					isInitial={this.props.isInitial}
				/>
			</div>
		);
	}
}

export default MapBoxScreen;
