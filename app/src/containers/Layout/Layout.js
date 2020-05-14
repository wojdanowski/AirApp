import React, { Component } from 'react';

import Backdrop from './../../components/UI/Backdrop/Backdrop';
import { UiProvider } from './../../Context/UiContext';

class Layout extends Component {
	state = {
		showSidebar: false,
		showBackdrop: false,
		selectedStationId: null,
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

	setSelectedStationId = (id) => {
		console.log(`New selected station id: ${id}`);
		this.setState(() => {
			return { selectedStationId: id };
		});
	};

	render() {
		return (
			<UiProvider
				value={{
					showSidebar: this.state.showSidebar,
					showBackdrop: this.state.showBackdrop,
					selectedStationId: this.state.selectedStationId,
					uiFunctions: {
						setSelectedStationId: this.setSelectedStationId,
						toggleSidebar: this.toggleSidebarHandler,
						toggleBackdrop: this.toggleBackdropHandler,
					},
				}}
			>
				<Backdrop isOpen={this.state.showBackdrop} />
				<main>{this.props.children}</main>
			</UiProvider>
		);
	}
}

export default Layout;
