import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';

import MainScreen from '../../components/Screens/MainScreen/MainScreen';
import MapBoxScreen from '../../components/Screens/MapBoxScreen/MapBoxScreen';
import SideBar from '../../components/UI/SideBar/SideBar';

class Layout extends Component {
	state = {
		showSidebar: false,
	};

	toggleSidebarHandler = () => {
		this.setState((prevState) => {
			return { showSidebar: !prevState.showSidebar };
		});
	};

	geoIconClickedHandler = () => {
		const success = (position) => {
			const latitude = position.coords.latitude;
			const longitude = position.coords.longitude;
			const coordinates = `Lat: ${latitude} Lng: ${longitude}`;
			console.log(coordinates);
			alert(coordinates);
		};

		const error = () => {
			console.log(`Error retriving position`);
		};

		navigator.geolocation.getCurrentPosition(success, error);
	};

	render() {
		return (
			<Aux>
				<SideBar
					isOpen={this.state.showSidebar}
					toggleSidebar={this.toggleSidebarHandler}
				/>
				<MainScreen geoIconClicked={this.geoIconClickedHandler} />
				<MapBoxScreen />
			</Aux>
		);
	}
}

export default Layout;
