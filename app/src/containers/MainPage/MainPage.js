import React, { Component } from 'react';
import axios from 'axios';

import MapBoxScreen from './../../components/Screens/MapBoxScreen/MapBoxScreen';
import LocationForm from './../../components/InputForms/LocationForm/LocationForm';
import SideBar from './../../components/UI/SideBar/SideBar';
import classes from './MainPage.module.css';
import Aux from './../../hoc/Auxiliary/Auxiliary';
import UiContext from './../../Context/UiContext';
import * as LINKS from './../../Utils/Links';

class MainPage extends Component {
	constructor(props) {
		super(props);
		this.mapBoxRef = React.createRef();
		this.mainScreenRef = React.createRef();
		this.state = {
			isSensorDataLoading: true,
			isInitial: true,
			placesSuggestions: [],
			selectedCoordinates: [],
			allStations: null,
			areAllStationsLoaded: false,
			displayedStation: {
				stationName: '',
				coordinates: [],
				measurement: [],
				sensorList: null,
				sensorsData: null,
				stationId: null,
			},
		};
	}
	static contextType = UiContext;

	componentDidMount() {
		this.getAllStations();
	}

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

	placeSuggestionHandler = async (content) => {
		if (content.length > 0) {
			const mapBoxQuery = `${LINKS.MAP_BOX_API_URL}${content}.json?access_token=${LINKS.MAP_BOX_KEY}&${LINKS.MAP_BOX_QUERY_OPT}`;

			try {
				const res = await axios(mapBoxQuery);
				const placesSuggestions = res.data.features.map((place) => {
					const filteredPlace = {};
					filteredPlace.coordinates = [...place.geometry.coordinates];
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

	getAllStations = async () => {
		this.setState({
			areAllStationsLoaded: false,
		});
		const query = `${LINKS.AIR_API_URL}stations`;
		try {
			const res = (await axios(query)).data;
			this.setState({
				allStations: res.data.stations,
				areAllStationsLoaded: true,
			});
		} catch (error) {
			console.log(`error in getAllStations`);
			console.log(error);
			return error;
		}
	};

	getNearestStation = async (coordinates) => {
		const query = `${LINKS.PROXY}${LINKS.AIR_API_URL}nearestAirIndex/?lat=${coordinates[1]}&lon=${coordinates[0]}`;
		try {
			const res = (await axios(query)).data;
			this.setState({
				displayedStation: {
					...this.state.displayedStation,
					stationName: res.data.station.name,
					coordinates: [...res.data.station.location.coordinates],
					measurement: res.data.station.mIndexes,
					stationId: res.data.station._id,
				},
			});
		} catch (error) {
			console.log(`error in getNearestStation`);
			console.log(error);
			return error;
		}
	};

	// getSensorList = async (stationId) => {
	// 	const query = `${LINKS.PROXY}${LINKS.GIOS_API_URL}station/sensors/${stationId}`;
	// 	try {
	// 		const res = await axios(query);
	// 		this.setState({
	// 			displayedStation: {
	// 				...this.state.displayedStation,
	// 				sensorList: res.data,
	// 			},
	// 		});
	// 		this.getSensorData(res.data);
	// 	} catch (error) {
	// 		console.log(`error in getSensorList`);
	// 		alert(error);
	// 		return error;
	// 	}
	// };

	// getSensorData = async (sensorsList) => {
	// 	if (!this.state.isSensorDataLoading) {
	// 		this.setState({ isSensorDataLoading: true });
	// 	}
	// 	const query = `${LINKS.PROXY}${LINKS.GIOS_API_URL}data/getData/`;
	// 	const fetchDataPromises = sensorsList.map((el, index) => {
	// 		return new Promise(() => {
	// 			axios(query + el.id).then((res) => {
	// 				let newSensorsData = [];
	// 				const oldState = this.state.displayedStation.sensorsData;
	// 				if (oldState) {
	// 					newSensorsData = [...oldState];
	// 				}
	// 				newSensorsData.push(res.data);

	// 				this.setState({
	// 					displayedStation: {
	// 						...this.state.displayedStation,
	// 						sensorsData: newSensorsData,
	// 					},
	// 				});
	// 			});
	// 		});
	// 	});
	// 	try {
	// 		await Promise.all([...fetchDataPromises]);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	scrollToRef = (ref) => {
		window.scrollTo(0, ref.current.offsetTop);
	};

	showLocationOnMap = async (coordinates) => {
		const fetchError = await this.getNearestStation(coordinates);
		if (!fetchError) {
			this.scrollToRef(this.mapBoxRef);
			if (!this.context.showSidebar) {
				this.context.uiFunctions.toggleSidebar();
			}
			this.setState({
				selectedCoordinates: [...coordinates],
				isInitial: false,
			});
			this.readAllForStation(this.state.displayedStation.stationId);
		} else {
			console.log(`fetchError in showLocationOnMap`);
			alert(fetchError);
		}
	};

	readAllForStation = async (stationId) => {
		const query = `${LINKS.AIR_API_URL}stations/sensors/${stationId}`;
		try {
			const res = (await axios(query)).data;
			this.setState({
				displayedStation: {
					...this.state.displayedStation,
					sensorsData: res.data,
				},
			});
		} catch (error) {
			console.log(`fetch error in readAllForStation`);
			console.log(error);
		}
	};

	render() {
		return (
			<Aux>
				<SideBar stationData={this.state.displayedStation} />
				<div className={classes.MainScreenBox} ref={this.mainScreenRef}>
					<LocationForm
						geoIconClicked={this.geoIconClickedHandler}
						changeHandler={this.placeSuggestionHandler}
						placesSuggestions={this.state.placesSuggestions}
						suggestionClickedHandler={this.showLocationOnMap}
					/>
				</div>
				<MapBoxScreen
					allStationsData={this.state.allStations}
					areAllStationsLoaded={this.state.areAllStationsLoaded}
					arrowClickedHandler={() =>
						this.scrollToRef(this.mainScreenRef)
					}
					mapRef={this.mapBoxRef}
					isInitial={this.state.isInitial}
					selectedCoordinates={this.state.selectedCoordinates}
					displayedStation={this.state.displayedStation}
				/>
			</Aux>
		);
	}
}

export default MainPage;
