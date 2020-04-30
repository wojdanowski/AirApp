import React, { Component } from 'react';

import SideBar from '../../components/UI/SideBar/SideBar';
import Backdrop from './../../components/UI/Backdrop/Backdrop';
import { UiProvider } from './../../Context/UiContext';

class Layout extends Component {
	state = {
		showSidebar: false,
		showBackdrop: false,
		uiFunctions: {
			isWorking: this.isWorking,
		},
	};

	toggleSidebarHandler = () => {
		this.setState((prevState) => {
			return { showSidebar: !prevState.showSidebar };
		});
	};

	toggleBackdropHandler = () => {
		this.setState((prevState) => {
			return { showBackdrop: !prevState.showBackdrop };
		});
	};

	isWorking = () => {
		console.log(`WORKING`);
	};

	render() {
		return (
			<UiProvider
				value={{
					isWorking: this.isWorking,
					valueTwo: 'valueTwo',
				}}
			>
				<SideBar
					isOpen={this.state.showSidebar}
					toggleSidebar={this.toggleSidebarHandler}
				/>
				<Backdrop isOpen={this.state.showBackdrop} />
				<main>{this.props.children}</main>
			</UiProvider>
		);
	}
}

export default Layout;
