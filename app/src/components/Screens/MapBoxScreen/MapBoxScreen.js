import React, { Component } from 'react';

import classes from './MapBoxScreen.module.css';
import MapBox from './../../../containers/MapBox/MapBox';
import Arrows from './../../UI/Arrows/Arrows';

class MapBoxScreen extends Component {
	render() {
		return (
			<div className={classes.MapBoxScreen} ref={this.props.mapRef}>
				<Arrows
					arrowType={'button-up'}
					clicked={this.props.arrowClickedHandler}
				/>
				<MapBox
					readAllForStation={this.props.readAllForStation}
					allStationsData={this.props.allStationsData}
					areAllStationsLoaded={this.props.areAllStationsLoaded}
					displayedStation={this.props.displayedStation}
					selectedCoordinates={this.props.selectedCoordinates}
					isInitial={this.props.isInitial}
				/>
			</div>
		);
	}
}

export default MapBoxScreen;
