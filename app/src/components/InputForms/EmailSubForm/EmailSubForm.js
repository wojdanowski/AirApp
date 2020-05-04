import React, { Component } from 'react';
import MainButton from './../../UI/Buttons/MainButton/MainButton';
import Aux from './../../../hoc/Auxiliary/Auxiliary';

class EmailSubForm extends Component {
	state = {
		typedEmail: '',
	};

	subscribeLocationHandler = () => {
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
