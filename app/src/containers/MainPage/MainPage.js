import React, { Component } from 'react';

import Aux from './../../hoc/Auxiliary/Auxiliary';
import MapBoxScreen from './../../components/Screens/MapBoxScreen/MapBoxScreen';
import LocationForm from './../../components/InputForms/LocationForm/LocationForm';
import classes from './MainPage.module.css';

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
			selectedPlace: '',
		};
	}

	placeSelectionHandler = (content) => {
		console.log(content);
		// this.setState({
		// 	selectedPlace: content,
		// });
	};

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
			this.setState({
				selectedCoordinates: {
					lat: latitude,
					lng: longitude,
				},
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
				<div className={classes.MainScreenBox}>
					<LocationForm
						geoIconClicked={this.geoIconClickedHandler}
						changeHandler={this.placeSelectionHandler}
					/>
				</div>
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
