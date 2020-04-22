import React, { Component } from 'react';

import Aux from './../../hoc/Auxiliary/Auxiliary';
import MainScreen from './../../components/Screens/MainScreen/MainScreen';
import MapBoxScreen from './../../components/Screens/MapBoxScreen/MapBoxScreen';

class MainPage extends Component {
	state = {};

	geoIconClickedHandler = () => {
		const success = (position) => {
			const latitude = position.coords.latitude;
			const longitude = position.coords.longitude;
			const coordinates = `Lat: ${latitude} Lng: ${longitude}`;
			console.log(coordinates);
			alert(coordinates);
		};

		const error = () => {
			console.log(`Error retriving position`);
		};

		navigator.geolocation.getCurrentPosition(success, error);
	};

	render() {
		return (
			<Aux>
				<MainScreen geoIconClicked={this.geoIconClickedHandler} />
				<MapBoxScreen />
			</Aux>
		);
	}
}

export default MainPage;
