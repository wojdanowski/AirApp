import React, { Component } from 'react';
import Aux from './../Auxiliary/Auxiliary';

import MainScreen from './../../components/Screens/MainScreen/MainScreen';
import MapBoxScreen from './../../components/Screens/MapBoxScreen/MapBoxScreen';
import SideBar from './../../components/UI/SideBar/SideBar';

class Layout extends Component {
	state = {
		showSidebar: false,
	};

	toggleSidebarHandler = () => {
		this.setState((prevState) => {
			return { showSidebar: !prevState.showSidebar };
		});
	};

	render() {
		return (
			<Aux>
				<SideBar
					isOpen={this.state.showSidebar}
					toggleSidebar={this.toggleSidebarHandler}
				/>
				<MainScreen />
				<MapBoxScreen />
			</Aux>
		);
	}
}

export default Layout;
