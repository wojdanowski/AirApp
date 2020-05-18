import React, { Component } from 'react';

import { UiProvider } from './../../Context/UiContext';

class Layout extends Component {
	state = {
		showSidebar: false,
		showBackdrop: false,
		selectedStationId: null,
		showBigLoader: false,
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
		// console.log(`New selected station id: ${id}`);
		this.setState(() => {
			return { selectedStationId: id };
		});
	};

	scrollToRef = (ref) => {
		window.scrollTo(0, ref.current.offsetTop);
	};

	openSidebar = () => {
		if (!this.state.showSidebar) this.toggleSidebarHandler();
	};

	toggleBigLoaderHandler = () => {
		this.toggleBackdropHandler();
		this.setState((prevState) => {
			return { showBigLoader: !prevState.showBigLoader };
		});
	};

	render() {
		return (
			<UiProvider
				value={{
					showSidebar: this.state.showSidebar,
					showBackdrop: this.state.showBackdrop,
					selectedStationId: this.state.selectedStationId,
					showBigLoader: this.state.showBigLoader,
					uiFunctions: {
						setSelectedStationId: this.setSelectedStationId,
						toggleSidebar: this.toggleSidebarHandler,
						toggleBackdrop: this.toggleBackdropHandler,
						openSidebar: this.openSidebar,
						scrollToRef: this.scrollToRef,
						toggleBigLoader: this.toggleBigLoaderHandler,
					},
				}}
			>
				<main>{this.props.children}</main>
			</UiProvider>
		);
	}
}

export default Layout;
