import React, { Component } from 'react';
import axios from 'axios';

import MapBoxScreen from './../../components/Screens/MapBoxScreen/MapBoxScreen';
import LocationForm from './../../components/InputForms/LocationForm/LocationForm';
import SideBar from './../../components/UI/SideBar/SideBar';
import classes from './MainPage.module.css';
import Aux from './../../hoc/Auxiliary/Auxiliary';
import UiContext from './../../Context/UiContext';
import * as LINKS from './../../Utils/Links';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from './../../components/UI/Modal/Modal';

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
			isAllStationsLoading: true,
			displayedStation: {
				stationName: '',
				coordinates: [],
				measurement: [],
				sensorsData: null,
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
			this.showNearestStation(selectedCoordinates);
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
		this.context.uiFunctions.toggleBigLoader();
		this.setState({
			isAllStationsLoading: true,
		});
		const query = `${LINKS.AIR_API_URL}stations`;
		try {
			const res = (await axios(query)).data;
			this.setState({
				allStations: res.data.stations,
				isAllStationsLoading: false,
			});
			this.context.uiFunctions.toggleBigLoader();
		} catch (error) {
			console.log(`error in getAllStations`);
			console.log(error);
			return error;
		}
	};

	getNearestStation = async (coordinates) => {
		const query = `${LINKS.AIR_API_URL}nearestAirIndex/?lat=${coordinates[1]}&lon=${coordinates[0]}`;
		try {
			const res = (await axios(query)).data;
			this.context.uiFunctions.setSelectedStationId(res.data.station._id);
			this.setState({
				displayedStation: {
					...this.state.displayedStation,
					stationName: res.data.station.name,
					coordinates: [...res.data.station.location.coordinates],
					measurement: res.data.station.mIndexes,
				},
			});
		} catch (error) {
			console.log(`error in getNearestStation`);
			console.log(error);
			return error;
		}
	};

	showNearestStation = async (coordinates) => {
		this.context.uiFunctions.toggleBigLoader();
		const fetchError = await this.getNearestStation(coordinates);
		this.context.uiFunctions.toggleBigLoader();
		if (!fetchError) {
			this.context.uiFunctions.scrollToRef(this.mapBoxRef);
			this.context.uiFunctions.openSidebar();
			this.setState({
				selectedCoordinates: [...coordinates],
				isInitial: false,
			});
			this.readAllForStation(this.context.selectedStationId);
		} else {
			console.log(`fetchError in showNearestStation`);
			alert(fetchError);
		}
	};

	manualSelectionHandler = (stationId, coordinates, name) => {
		this.context.uiFunctions.openSidebar();
		this.readAllForStation(stationId);
		this.setState({
			displayedStation: {
				...this.state.displayedStation,
				coordinates: coordinates,
				stationName: name,
			},
		});
	};

	readAllForStation = async (stationId) => {
		const query = `${LINKS.AIR_API_URL}stations/sensors/${stationId}`;
		this.setState({
			isSensorDataLoading: true,
		});

		try {
			const res = (await axios(query)).data;
			this.setState({
				isSensorDataLoading: false,
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
				<Modal show={this.context.showBigLoader}>
					<Spinner />
				</Modal>
				<SideBar
					stationData={this.state.displayedStation}
					isSensorDataLoading={this.state.isSensorDataLoading}
				/>
				<div className={classes.MainScreenBox} ref={this.mainScreenRef}>
					<LocationForm
						geoIconClicked={this.geoIconClickedHandler}
						changeHandler={this.placeSuggestionHandler}
						placesSuggestions={this.state.placesSuggestions}
						suggestionClickedHandler={this.showNearestStation}
					/>
				</div>
				<MapBoxScreen
					stationSelectionHandler={this.manualSelectionHandler}
					allStationsData={this.state.allStations}
					isAllStationsLoading={this.state.isAllStationsLoading}
					arrowClickedHandler={() =>
						this.context.uiFunctions.scrollToRef(this.mainScreenRef)
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
