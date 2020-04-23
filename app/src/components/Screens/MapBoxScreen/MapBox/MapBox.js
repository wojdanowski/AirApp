import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import classes from './MapBox.module.css';
import Aux from './../../../../hoc/Auxiliary/Auxiliary';

mapboxgl.accessToken =
	'pk.eyJ1Ijoid29qZGFub3dza2kiLCJhIjoiY2s5OXN6a2Z4MDFmNjNkbzhoN3Q2YnFlMSJ9.2C8OnyKvuiEhSHSCnd5LHA';

class MapBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			coordinates: null,
			zoom: 11,
			initialZoom: 5,
			map: null,
			bounds: null,
		};
	}

	componentDidMount() {
		const map = new mapboxgl.Map({
			container: this.mapContainer,
			style: 'mapbox://styles/wojdanowski/ck99wcv550q9o1inuxwtg6h4b',
			// center: [this.state.lng, this.state.lat],
			// zoom: this.state.zoom,
			interactive: true,
		});

		// map.addControl(
		// 	new MapboxGeocoder({
		// 		accessToken: mapboxgl.accessToken,
		// 		mapboxgl: mapboxgl,
		// 	})
		// );

		this.setState(() => {
			return {
				map,
			};
		});
	}

	// showLocation(isInitial){

	// }

	componentDidUpdate(prevProps) {
		const coordinates = this.props.selectedCoordinates;
		const bounds = new mapboxgl.LngLatBounds(coordinates, coordinates);
		let zoom = null;

		this.props.isInitial
			? (zoom = this.state.initialZoom)
			: (zoom = this.state.zoom);

		this.state.map.fitBounds(bounds, {
			maxZoom: zoom,
		});

		if (coordinates !== prevProps.selectedCoordinates) {
			this.setState({
				coordinates,
				bounds,
			});
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
