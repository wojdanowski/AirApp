import React, { Component } from 'react';
import Aux from './../Auxiliary/Auxiliary';

import MainScreen from './../../components/Screens/MainScreen/MainScreen';
import MapBoxScreen from './../../components/Screens/MapBoxScreen/MapBoxScreen';

class Layout extends Component {
	state = {
		showSideBar: false,
	};
	render() {
		return (
			<Aux>
				<MainScreen />
				<MapBoxScreen />
			</Aux>
		);
	}
}

export default Layout;
