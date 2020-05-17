import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';

import classes from './MapBox.module.css';
import './mapboxCustom.css';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import UiContext from './../../Context/UiContext';

mapboxgl.accessToken =
	'pk.eyJ1Ijoid29qZGFub3dza2kiLCJhIjoiY2s5OXN6a2Z4MDFmNjNkbzhoN3Q2YnFlMSJ9.2C8OnyKvuiEhSHSCnd5LHA';

class MapBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			coordinates: null,
		};
		this.map = null;
		this.bounds = null;
		this.displayedMarker = null;
	}

	static contextType = UiContext;

	componentDidMount() {
		this.map = new mapboxgl.Map({
			container: this.mapContainer,
			style: 'mapbox://styles/wojdanowski/ck99wcv550q9o1inuxwtg6h4b',
			interactive: true,
		});
	}

	componentDidUpdate(prevProps) {
		if (
			!this.props.isAllStationsLoading &&
			prevProps.isAllStationsLoading
		) {
			this.generateAllStations();
		}

		const coordinates = this.props.selectedCoordinates;
		const displayedStationCoord = this.props.displayedStation.coordinates;

		if (coordinates === prevProps.selectedCoordinates) return;

		this.bounds = new mapboxgl.LngLatBounds();
		this.bounds.extend(coordinates);
		this.bounds.extend(displayedStationCoord);
		if (window.screen.availWidth > 600) {
			this.map.fitBounds(this.bounds, {
				padding: {
					top: 200,
					bottom: 200,
					left: 350,
					right: 200,
				},
			});
		} else {
			this.map.fitBounds(this.bounds, {
				padding: {
					top: 50,
					bottom: 50,
					left: 50,
					right: 50,
				},
			});
		}

		const popupDescription = this.createPopupText(
			this.props.displayedStation.stationName,
			this.props.displayedStation.measurement
		);
		this.createPopup(displayedStationCoord, popupDescription, this.map);

		const seleLocationMarker = document.createElement('div');
		seleLocationMarker.className = classes.selectedLocationMarker;

		if (this.displayedMarker) {
			this.displayedMarker.remove();
		}
		this.displayedMarker = new mapboxgl.Marker({
			element: seleLocationMarker,
			anchor: 'center',
		})
			.setLngLat(coordinates)
			.addTo(this.map);
	}

	generateAllStations = () => {
		// this.map.loadImage(gradientImg, (error, image) => {
		// 	if (error) throw error;
		// 	this.map.addImage('gradient', image);
		// });

		const stationsDataSet = this.props.allStationsData.map((station) => {
			const stationPopupDescription = this.createPopupText(
				station.name,
				station.mIndexes
			);
			return {
				type: 'Feature',
				properties: {
					description: stationPopupDescription,
					// icon: 'gradient',
					id: station._id,
					stationName: station.name,
					indexes: station.mIndexes,
				},
				geometry: {
					type: 'Point',
					coordinates: station.location.coordinates,
				},
			};
		});

		const stationsLayerData = {
			type: 'geojson',
			data: {
				type: 'FeatureCollection',
				features: stationsDataSet,
			},
		};

		stationsLayerData.data.features.forEach((feature) => {
			const gradientClassName = this.assignGradientClass(
				'PM10',
				feature.properties.indexes
			);

			let el = document.createElement('div');
			el.className = `${classes.stationMarker} ${classes[gradientClassName]}`;

			new mapboxgl.Marker(el)
				.setLngLat(feature.geometry.coordinates)
				.setPopup(
					new mapboxgl.Popup().setHTML(feature.properties.description)
				)
				.addTo(this.map);

			el.addEventListener('click', () => {
				const coordinates = feature.geometry.coordinates.slice();
				const selectedStationId = feature.properties.id;
				const stationName = feature.properties.stationName;

				this.context.uiFunctions.setSelectedStationId(
					selectedStationId
				);
				this.props.stationSelectionHandler(
					selectedStationId,
					coordinates,
					stationName
				);
			});
		});

		this.map.addSource('stations', stationsLayerData);

		this.map.addLayer({
			id: 'stations',
			type: 'symbol',
			source: 'stations',
			layout: {
				'icon-image': '{icon}',
				'icon-size': 0.7,
				'icon-allow-overlap': true,
			},
		});
	};

	assignGradientClass = (paramName, indexArray) => {
		let paramCondition = null;
		let gradientClassName = 'condition';
		paramCondition = indexArray.filter((el) => el.param === paramName);

		if (paramCondition.length === 0) {
			gradientClassName += 'NoData';
			return gradientClassName;
		} else paramCondition = paramCondition[0].indexLevel.indexLevelName;

		switch (paramCondition) {
			case 'Bardzo dobry':
				gradientClassName += 'VeryGood';
				break;
			case 'Dobry':
				gradientClassName += 'Good';
				break;
			case 'Umiarkowany':
				gradientClassName += 'Moderate';
				break;
			case 'Dostateczny':
				gradientClassName += 'Sufficient';
				break;
			case 'Zły':
				gradientClassName += 'Bad';
				break;
			case 'Bardzo zły':
				gradientClassName += 'VeryBad';
				break;
			default:
				gradientClassName += 'NoData';
		}

		return gradientClassName;
	};

	// assignEventHandlers = () => {
	// 	// When a click event occurs on a feature in the stations layer, open a popup at the
	// 	// location of the feature, with description HTML from its properties.
	// 	this.map.on('click', 'stations', (e) => {
	// 		const coordinates = e.features[0].geometry.coordinates.slice();
	// 		const description = e.features[0].properties.description;
	// 		const selectedStationId = e.features[0].properties.id;
	// 		const stationName = e.features[0].properties.stationName;
	// 		console.log('id of clicked station:');
	// 		console.log(e.features[0].properties.id);

	// 		// Ensure that if the map is zoomed out such that multiple
	// 		// copies of the feature are visible, the popup appears
	// 		// over the copy being pointed to.
	// 		while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
	// 			coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
	// 		}

	// 		this.createPopup(coordinates, description, this.map);
	// 		this.context.uiFunctions.setSelectedStationId(selectedStationId);
	// 		this.props.stationSelectionHandler(
	// 			selectedStationId,
	// 			coordinates,
	// 			stationName
	// 		);
	// 	});

	// 	// Change the cursor to a pointer when the mouse is over the stations layer.
	// 	this.map.on('mouseenter', 'stations', () => {
	// 		this.map.getCanvas().style.cursor = 'pointer';
	// 	});

	// 	// Change it back to a pointer when it leaves.
	// 	this.map.on('mouseleave', 'stations', () => {
	// 		this.map.getCanvas().style.cursor = '';
	// 	});
	// };

	createPopupText = (stationName, data) => {
		let stationPopupDescription = `<strong>${stationName}</strong><br />`;
		if (data.length === 0) {
			stationPopupDescription += 'Brak danych';
		} else {
			const allIndexes = data.map((el) => {
				const text = `${el.param} : ${el.indexLevel.indexLevelName}<br />`;
				return text;
			});
			stationPopupDescription += allIndexes.join('');
		}
		return stationPopupDescription;
	};

	createPopup = (coordinates, description, target) => {
		new mapboxgl.Popup()
			.setLngLat(coordinates)
			.setHTML(description)
			.addTo(target);
	};

	render() {
		return (
			<Aux>
				<div
					ref={(el) => (this.mapContainer = el)}
					className={classes.mapContainer}
				/>
			</Aux>
		);
	}
}

export default MapBox;
