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
		this.AIR_API_URL = 'https://air-data-api.herokuapp.com/api/';
		this.MAP_BOX_API_URL =
			'https://api.mapbox.com/geocoding/v5/mapbox.places/';
		this.MAP_BOX_KEY =
			'pk.eyJ1Ijoid29qZGFub3dza2kiLCJhIjoiY2s5OXN6a2Z4MDFmNjNkbzhoN3Q2YnFlMSJ9.2C8OnyKvuiEhSHSCnd5LHA';
		this.MAP_BOX_QUERY_OPT =
			'cachebuster=1587665183995&autocomplete=true&country=pl&types=poi%2Cplace%2Cregion%2Caddress&bbox=13.628935705399272%2C48.64958968470896%2C24.63306192625683%2C55.12432296512296&language=pl';
		this.state = {
			isInitial: true,
			placesSuggestions: [],
			// initial coordinates for mapbox. Center of Poland
			selectedCoordinates: [],
			displayedStation: {
				stationName: '',
				coordinates: [],
				measurement: {},
			},

			// displayedStations: [
			// 	{
			// 		stationId: '',
			// 		stationCoordinates: {
			// 			lat: 11,
			// 			lng: 12,
			// 		},
			// 		stationMeasurement: {},
			// 	},
			// ],
		};
	}

	placeSuggestionHandler = async (content) => {
		if (content.length > 0) {
			const mapBoxQuery = `${this.MAP_BOX_API_URL}${content}.json?access_token=${this.MAP_BOX_KEY}&${this.MAP_BOX_QUERY_OPT}`;

			try {
				const res = await axios(mapBoxQuery);
				const placesSuggestions = res.data.features.map((place) => {
					const filteredPlace = {};
					filteredPlace.coordinates = [
						...place.geometry.coordinates,
						// lat: place.geometry.coordinates[1],
						// lng: place.geometry.coordinates[0],
					];
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

	getStationData = async (coordinates) => {
		const proxy = 'https://cors-anywhere.herokuapp.com/';
		const query = `${proxy}${this.AIR_API_URL}nearestAirIndex/?lat=${coordinates[1]}&lon=${coordinates[0]}`;
		try {
			const res = (await axios(query)).data;
			console.log(res.data);
			this.setState({
				displayedStation: {
					stationName: res.data.station.name,
					coordinates: [...res.data.station.location.coordinates],
					measurement: res.data.airData,
				},
			});
		} catch (error) {
			console.log(error);
			return error;
		}
	};

	scrollToRef = (ref) => {
		window.scrollTo(0, ref.current.offsetTop);
	};

	showLocationOnMap = async (coordinates) => {
		const fetchError = await this.getStationData(coordinates);
		if (!fetchError) {
			this.scrollToRef(this.mapBoxRef);
			this.setState({
				selectedCoordinates: [...coordinates],
				isInitial: false,
			});
		} else {
			alert(fetchError);
		}
	};

	geoIconClickedHandler = () => {
		const success = (position) => {
			const selectedCoordinates = [
				position.coords.longitude,
				position.coords.latitude,
			];
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
						changeHandler={this.placeSuggestionHandler}
						placesSuggestions={this.state.placesSuggestions}
						suggestionClickedHandler={this.showLocationOnMap}
					/>
				</div>
				<MapBoxScreen
					refProp={this.mapBoxRef}
					isInitial={this.state.isInitial}
					selectedCoordinates={this.state.selectedCoordinates}
					displayedStation={this.state.displayedStation}
				/>
			</Aux>
		);
	}
}

export default MainPage;
