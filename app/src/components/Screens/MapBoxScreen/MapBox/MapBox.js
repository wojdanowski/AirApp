import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';

import classes from './MapBox.module.css';
import Aux from './../../../../hoc/Auxiliary/Auxiliary';

mapboxgl.accessToken =
	'pk.eyJ1Ijoid29qZGFub3dza2kiLCJhIjoiY2s5OXN6a2Z4MDFmNjNkbzhoN3Q2YnFlMSJ9.2C8OnyKvuiEhSHSCnd5LHA';

class MapBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lat: 52.404967,
			lng: 16.926669,
			zoom: 10,
		};
	}

	componentDidMount() {
		const coordinates = [this.state.lng, this.state.lat];
		// const addCoordinates = [this.state.lng + 0.001, this.state.lat + 0.001];

		const bounds = new mapboxgl.LngLatBounds(coordinates, coordinates);
		// bounds.extend(coordinates);
		// bounds.extend(addCoordinates);

		const map = new mapboxgl.Map({
			container: this.mapContainer,
			style: 'mapbox://styles/wojdanowski/ck99wcv550q9o1inuxwtg6h4b',
			// center: [this.state.lng, this.state.lat],
			// zoom: this.state.zoom,
			interactive: false,
		});

		map.fitBounds(bounds, { maxZoom: 12 });
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
