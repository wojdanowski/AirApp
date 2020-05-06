import React, { Component } from 'react';
import axios from 'axios';
import * as LINKS from './../../../Utils/Links';

import MainButton from './../../UI/Buttons/MainButton/MainButton';
import Aux from './../../../hoc/Auxiliary/Auxiliary';

class EmailSubForm extends Component {
	state = {
		typedEmail: '',
	};

	subscribeLocationHandler = async () => {
		const query = `${LINKS.AIR_API_URL}subscriptions`;

		try {
			const res = await axios({
				method: 'GET',
				url: query,
				data: {
					email: this.state.typedEmail,
					lat: this.props.stationCoordinates[0],
					lon: this.props.stationCoordinates[1],
					hours: [7],
				},
			});
			console.log(res);
		} catch (error) {
			console.log(`error in subscribeLocationHandler`);
			console.log(error);
			return error;
		}

		console.log(`submit form`);
	};

	formChangedHandler = (event) => {
		console.log(event.target.value);
		this.setState({
			typedEmail: event.target.value,
		});
	};

	render() {
		return (
			<Aux>
				<h3>Get email notification</h3>
				<label>
					<input
						type='email'
						placeholder='Email Address'
						onChange={(event) => this.formChangedHandler(event)}
					/>
				</label>
				<form
					onSubmit={(event) => {
						event.preventDefault();
						this.subscribeLocationHandler();
					}}
				>
					<MainButton
						label={'SUBSCRIBE'}
						clicked={() => this.subscribeLocationHandler()}
					/>
				</form>
			</Aux>
		);
	}
}

export default EmailSubForm;
