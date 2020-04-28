import React, { Component } from 'react';

import classes from './MapBoxScreen.module.css';
import MapBox from './MapBox/MapBox';

class MapBoxScreen extends Component {
	render() {
		return (
			<div className={classes.MapBoxScreen} ref={this.props.refProp}>
				<MapBox
					displayedStation={this.props.displayedStation}
					selectedCoordinates={this.props.selectedCoordinates}
					isInitial={this.props.isInitial}
					shouldUpdateMap={this.props.shouldUpdateMap}
				/>
			</div>
		);
	}
}

export default MapBoxScreen;
