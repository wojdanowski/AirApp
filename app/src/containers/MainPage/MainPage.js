import React, { Component } from 'react';

import Aux from './../../hoc/Auxiliary/Auxiliary';
import MainScreen from './../../components/Screens/MainScreen/MainScreen';
import MapBoxScreen from './../../components/Screens/MapBoxScreen/MapBoxScreen';

class MainPage extends Component {
	constructor(props) {
		super(props);
		this.mapBoxRef = React.createRef();
		this.state = {
			// initial coordinates for mapbox. Center of Poland
			selectedCoordinates: {
				lat: 52.13,
				lng: 19.25,
			},
			isInitial: true,
		};
	}

	scrollToRef = (ref) => {
		window.scrollTo(0, ref.current.offsetTop);
	};

	locationSelectedHandler() {
		this.setState({
			isInitial: false,
		});
	}

	geoIconClickedHandler = () => {
		const success = (position) => {
			const latitude = position.coords.latitude;
			const longitude = position.coords.longitude;
			// const coordinates = `Lat: ${latitude} Lng: ${longitude}`;
			// console.log(coordinates);
			// alert(coordinates);
			this.setState((prevState) => {
				return {
					selectedCoordinates: {
						lat: latitude,
						lng: longitude,
					},
				};
			});
			this.locationSelectedHandler();
			this.scrollToRef(this.mapBoxRef);
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
				<MapBoxScreen
					refProp={this.mapBoxRef}
					isInitial={this.state.isInitial}
					selectedCoordinates={this.state.selectedCoordinates}
				/>
			</Aux>
		);
	}
}

export default MainPage;
