import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';

import SideBar from '../../components/UI/SideBar/SideBar';
import MainPage from './../MainPage/MainPage';

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
				<MainPage />
			</Aux>
		);
	}
}

export default Layout;
