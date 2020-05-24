import React, { Component } from 'react';
import axios from 'axios';
import * as LINKS from '../../../Utils/LINKS';

import MainButton from './../../UI/Buttons/MainButton/MainButton';
import Aux from './../../../hoc/Auxiliary/Auxiliary';
import classes from './EmailSubForm.module.css';
import Checkbox from './../../UI/Checkbox/Checkbox';
import { EMAIL_REGEX } from './../../../Utils/regexes';

class EmailSubForm extends Component {
	state = {
		typedEmail: '',
		selectedDays: [false, false, false, false, false, false, false],
		subscriptionSchedule: [],
	};

	subscribeLocationHandler = async () => {
		const query = `${LINKS.AIR_API_URL}subscriptions`;

		let subscriptionSchedule = [];
		this.state.selectedDays.forEach((day, index) => {
			if (day) {
				const newDay = {
					weekDay: index,
					hour: 8,
					minutes: 0,
				};
				subscriptionSchedule.push(newDay);
			}
		});

		if (!subscriptionSchedule.length) {
			alert('Nie wybrano dni');
			return;
		}
		if (!this.validateEmail(this.state.typedEmail)) {
			alert('Podano zły adres');
			return;
		}
		try {
			await axios({
				method: 'post',
				url: query,
				data: {
					email: this.state.typedEmail,
					lat: this.props.stationCoordinates[1],
					lon: this.props.stationCoordinates[0],
					hours: [...subscriptionSchedule],
				},
			});
			alert('Wiadomość została wysłana na podany email');
		} catch (error) {
			console.log(`error in subscribeLocationHandler`);
			console.log(error);
			alert('Błąd');
			return error;
		}
	};

	formChangedHandler = (event) => {
		this.setState({
			typedEmail: event.target.value,
		});
	};

	checkboxChangeHandler = (event) => {
		let newSelectedDays = [...this.state.selectedDays];
		newSelectedDays[event.target.day] = event.target.value;
		this.setState({
			selectedDays: newSelectedDays,
		});
	};

	validateEmail = (email) => {
		return EMAIL_REGEX.test(String(email).toLowerCase());
	};

	render() {
		const weekDays = [
			'Poniedziałek',
			'Wtorek',
			'Środa',
			'Czwartek',
			'Piątek',
			'Sobota',
			'Niedziela',
		];

		return (
			<Aux>
				<h3 className={classes.SubTitle}>subskrypcja</h3>
				<div className={classes.SubContainer}>
					<div className={classes.CheckBoxField}>
						{weekDays.map((el, index) => {
							return (
								<Checkbox
									key={index}
									day={index}
									label={el}
									onChangeHandler={this.checkboxChangeHandler}
								/>
							);
						})}
					</div>
					<div className={classes.EmailForm}>
						<label>
							<input
								type='email'
								placeholder='Email Address'
								onChange={(event) =>
									this.formChangedHandler(event)
								}
							/>
						</label>
						<form
							onSubmit={(event) => {
								event.preventDefault();
								this.subscribeLocationHandler();
							}}
						>
							<MainButton
								label={'wyślij'}
								clicked={() => this.subscribeLocationHandler()}
							/>
						</form>
					</div>
				</div>
			</Aux>
		);
	}
}

export default EmailSubForm;
