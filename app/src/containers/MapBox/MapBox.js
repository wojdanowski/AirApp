import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';

import classes from './MapBox.module.css';
import Aux from '../../hoc/Auxiliary/Auxiliary';

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
		const coordinates = this.props.selectedCoordinates;
		const displayedStationCoord = this.props.displayedStation.coordinates;

		if (coordinates !== prevProps.selectedCoordinates) {
			this.bounds = new mapboxgl.LngLatBounds();
			this.bounds.extend(coordinates);
			this.bounds.extend(displayedStationCoord);
			this.map.fitBounds(this.bounds, {
				padding: {
					top: 200,
					bottom: 200,
					left: 200,
					right: 200,
				},
			});

			const stationMarker = document.createElement('div');
			stationMarker.className = classes.stationMarker;
			new mapboxgl.Marker({
				element: stationMarker,
				anchor: 'center',
			})
				.setLngLat(displayedStationCoord)
				.addTo(this.map);

			const seleLocationMarker = document.createElement('div');
			seleLocationMarker.className = classes.selectedLocation;
			new mapboxgl.Marker({
				element: seleLocationMarker,
				anchor: 'center',
			})
				.setLngLat(coordinates)
				.addTo(this.map);

			const lookForNames = [
				'c6h6IndexLevel',
				'coIndexLevel',
				'no2IndexLevel',
				'o3IndexLevel',
				'pm10IndexLevel',
				'pm25IndexLevel',
				'so2IndexLevel',
				'stIndexLevel',
			];

			const isInTheArray = (value, array) => {
				return (value = array.includes(value));
			};

			const data = this.props.displayedStation.measurement;
			let filteredResponse = [];

			for (const key in data) {
				if (isInTheArray(key, lookForNames) && data[key]) {
					filteredResponse.push(
						`${key} : ${data[key].indexLevelName}`
					);
				}
			}

			console.log(filteredResponse);
			const popupText = filteredResponse.join('\n');

			const popup = new mapboxgl.Popup({
				offset: 30,
			})
				.setLngLat(displayedStationCoord)
				.setHTML(popupText)
				.addTo(this.map);
		}
	}

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
