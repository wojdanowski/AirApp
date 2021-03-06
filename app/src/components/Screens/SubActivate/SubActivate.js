import React, { Component } from 'react';

import Aux from '../../../hoc/Auxiliary/Auxiliary';
import axios from 'axios';
import queryString from 'query-string';
import * as LINKS from '../../../Utils/LINKS';
import Spinner from '../../UI/Spinner/Spinner';
import Modal from '../../UI/Modal/Modal';
import UiContext from '../../../Context/UiContext';

class SubActivate extends Component {
	state = {
		activationSuccess: false,
	};

	static contextType = UiContext;

	componentDidMount() {
		const parsedUrl = queryString.parse(this.props.location.search);
		this.activateSubscription(parsedUrl.jwt);
	}

	activateSubscription = async (token) => {
		const query = `${LINKS.AIR_API_URL}subscriptions/activate/${token}`;
		try {
			this.context.uiFunctions.toggleBigLoader();
			await axios(query);
			this.setState({
				activationSuccess: true,
			});
			this.context.uiFunctions.toggleBigLoader();
			alert('Activated !!!!');
		} catch (err) {
			if (this.context.showBigLoader)
				this.context.uiFunctions.toggleBigLoader();
			alert(err);
		}
	};

	render() {
		let activationStatus = 'Activation in progress';
		this.state.activationSuccess
			? (activationStatus = 'Activated !!!!')
			: (activationStatus = 'ERROR!!!!');
		return (
			<Aux>
				<Modal show={this.context.showBigLoader}>
					<Spinner />
				</Modal>
				{activationStatus}
			</Aux>
		);
	}
}

export default SubActivate;
