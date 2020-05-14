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

	scrollToRef = (ref) => {
		window.scrollTo(0, ref.current.offsetTop);
	};

	openSidebar = () => {
		if (!this.state.showSidebar) this.toggleSidebarHandler();
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
						openSidebar: this.openSidebar,
						scrollToRef: this.scrollToRef,
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
