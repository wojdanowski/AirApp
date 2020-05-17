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
					stationSelectionHandler={this.props.stationSelectionHandler}
					allStationsData={this.props.allStationsData}
					isAllStationsLoading={this.props.isAllStationsLoading}
					displayedStation={this.props.displayedStation}
					selectedCoordinates={this.props.selectedCoordinates}
					isInitial={this.props.isInitial}
				/>
			</div>
		);
	}
}

export default MapBoxScreen;
