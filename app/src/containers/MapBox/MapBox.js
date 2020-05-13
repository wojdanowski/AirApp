import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';

import classes from './MapBox.module.css';
import './mapboxCustom.css';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import gradientImg from '../../assets/gradient_temp.png';
// import pin from '../../assets/pin.png';

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
	}

	componentDidMount() {
		this.map = new mapboxgl.Map({
			container: this.mapContainer,
			style: 'mapbox://styles/wojdanowski/ck99wcv550q9o1inuxwtg6h4b',
			interactive: true,
		});
	}

	componentDidUpdate(prevProps) {
		if (
			this.props.areAllStationsLoaded &&
			!prevProps.areAllStationsLoaded
		) {
			this.generateAllStations();
		}

		const coordinates = this.props.selectedCoordinates;
		const displayedStationCoord = this.props.displayedStation.coordinates;

		if (coordinates === prevProps.selectedCoordinates) return;

		this.bounds = new mapboxgl.LngLatBounds();
		this.bounds.extend(coordinates);
		this.bounds.extend(displayedStationCoord);
		this.map.fitBounds(this.bounds, {
			padding: {
				top: 200,
				bottom: 200,
				left: 400,
				right: 200,
			},
		});

		const foundStationFeature = this.map.querySourceFeatures('stations', {
			sourceLayer: 'stations',
			filter: ['==', 'id', this.props.displayedStation.stationId],
		});
		let foundDescription;
		if (foundStationFeature[0]) {
			foundDescription = foundStationFeature[0].properties.description;
		} else {
			foundDescription = 'Station with that id not found';
		}

		console.log(foundStationFeature);

		this.createPopup(displayedStationCoord, foundDescription, this.map);

		// const stationMarker = document.createElement('div');
		// stationMarker.className = classes.stationMarker;
		// new mapboxgl.Marker({
		// 	element: stationMarker,
		// 	anchor: 'center',
		// })
		// 	.setLngLat(displayedStationCoord)
		// 	.addTo(this.map);

		const seleLocationMarker = document.createElement('div');
		seleLocationMarker.className = classes.selectedLocationMarker;
		new mapboxgl.Marker({
			element: seleLocationMarker,
			anchor: 'center',
		})
			.setLngLat(coordinates)
			.addTo(this.map);

		// new mapboxgl.Popup({
		// 	offset: 30,
		// })
		// 	.setLngLat(coordinates)
		// 	.setHTML('Your Location')
		// 	.addTo(this.map);

		// const allIndexesFromStation = this.props.displayedStation.measurement;
		// const allPopupText = allIndexesFromStation.map((el) => {
		// 	const text = `${el.param} : ${el.indexLevel.indexLevelName}<br />`;
		// 	return text;
		// });

		// new mapboxgl.Popup({
		// 	offset: 30,
		// })
		// 	.setLngLat(displayedStationCoord)
		// 	.setHTML(allPopupText.join(''))
		// 	.addTo(this.map);
	}

	generateAllStations = () => {
		this.map.loadImage(gradientImg, (error, image) => {
			if (error) throw error;
			this.map.addImage('gradient', image);
		});

		const stationsDataSet = this.props.allStationsData.map((station) => {
			let stationPopupDescription = `<strong>${station.name}</strong><br />`;
			if (station.mIndexes.length === 0) {
				stationPopupDescription += 'Brak danych';
			} else {
				const allIndexes = station.mIndexes.map((el) => {
					const text = `${el.param} : ${el.indexLevel.indexLevelName}<br />`;
					return text;
				});
				stationPopupDescription += allIndexes.join('');
			}

			return {
				type: 'Feature',
				properties: {
					description: stationPopupDescription,
					icon: 'gradient',
					id: station._id,
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

		this.map.addSource('stations', stationsLayerData);

		// const createMarkers = () => {
		// 	stationsLayerData.data.features.forEach((marker) => {
		// 		const stationMarker = document.createElement('div');
		// 		stationMarker.id = `marker-${marker.properties.id}`;
		// 		stationMarker.className = classes.stationMarker;

		// 		new mapboxgl.Marker({
		// 			element: stationMarker,
		// 			anchor: 'center',
		// 		})
		// 			.setLngLat(marker.geometry.coordinates)
		// 			.addTo(this.map);
		// 	});
		// };

		// createMarkers();
		this.assignEventHandlers();

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

	assignEventHandlers = () => {
		// When a click event occurs on a feature in the stations layer, open a popup at the
		// location of the feature, with description HTML from its properties.
		this.map.on('click', 'stations', (e) => {
			var coordinates = e.features[0].geometry.coordinates.slice();
			var description = e.features[0].properties.description;

			// Ensure that if the map is zoomed out such that multiple
			// copies of the feature are visible, the popup appears
			// over the copy being pointed to.
			while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
				coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
			}

			this.createPopup(coordinates, description, this.map);
		});

		// Change the cursor to a pointer when the mouse is over the stations layer.
		this.map.on('mouseenter', 'stations', () => {
			this.map.getCanvas().style.cursor = 'pointer';
		});

		// Change it back to a pointer when it leaves.
		this.map.on('mouseleave', 'stations', () => {
			this.map.getCanvas().style.cursor = '';
		});
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
