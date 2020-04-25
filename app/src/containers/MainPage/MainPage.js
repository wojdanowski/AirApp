import React, { Component } from 'react';
import axios from 'axios';

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
			placesSuggestions: [],
		};
	}

	placeSelectionHandler = async (content) => {
		if (content.length > 0) {
			const key =
				'pk.eyJ1Ijoid29qZGFub3dza2kiLCJhIjoiY2s5OXN6a2Z4MDFmNjNkbzhoN3Q2YnFlMSJ9.2C8OnyKvuiEhSHSCnd5LHA';
			const mapBoxQuery = `https://api.mapbox.com/geocoding/v5/mapbox.places/${content}.json?access_token=${key}&cachebuster=1587665183995&autocomplete=true&country=pl&types=poi%2Cplace%2Cregion%2Caddress&bbox=13.628935705399272%2C48.64958968470896%2C24.63306192625683%2C55.12432296512296&language=pl`;

			try {
				const res = await axios(mapBoxQuery);
				const placesSuggestions = res.data.features.map((place) => {
					const filteredPlace = {};
					filteredPlace.coordinates = {
						lat: place.geometry.coordinates[1],
						lng: place.geometry.coordinates[0],
					};
					filteredPlace.name = place.place_name
						.split(', ')
						.slice(0, 3)
						.join(', ');
					return {
						...filteredPlace,
					};
				});
				this.setState({
					placesSuggestions,
				});
			} catch (error) {
				console.log(error);
			}
		}
	};

	scrollToRef = (ref) => {
		window.scrollTo(0, ref.current.offsetTop);
	};

	showLocationOnMap = (coordinates) => {
		this.scrollToRef(this.mapBoxRef);
		this.setState({
			selectedCoordinates: {
				...coordinates,
			},
			isInitial: false,
		});
	};

	geoIconClickedHandler = () => {
		const success = (position) => {
			const selectedCoordinates = {
				lat: position.coords.latitude,
				lng: position.coords.longitude,
			};
			this.showLocationOnMap(selectedCoordinates);
		};

		const error = () => {
			console.log(`Error retrieving position`);
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
						placesSuggestions={this.state.placesSuggestions}
						suggestionClickedHandler={this.showLocationOnMap}
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
