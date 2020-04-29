import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';

import SideBar from '../../components/UI/SideBar/SideBar';
import Backdrop from './../../components/UI/Backdrop/Backdrop';

class Layout extends Component {
	state = {
		showSidebar: false,
		showBackdrop: false,
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

	render() {
		return (
			<Aux>
				<SideBar
					isOpen={this.state.showSidebar}
					toggleSidebar={this.toggleSidebarHandler}
				/>
				<Backdrop isOpen={this.state.showBackdrop} />
				<main>{this.props.children}</main>
			</Aux>
		);
	}
}

export default Layout;
