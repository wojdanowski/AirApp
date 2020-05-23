import React, { Component } from 'react';

import classes from './LocationForm.module.css';
import GeoIcon from './../../UI/GeoIcon/GeoIcon';
import PlaceSuggestion from './PlaceSuggestion/PlaceSuggestion';

class LocationForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			typedLocation: '',
		};
	}

	submitFormHandler = (event) => {
		event.preventDefault();
		const location = this.state.typedLocation;
		this.props.changeHandler(location);
		this.setState({ typedLocation: '' });
	};

	changeHandler = (event) => {
		this.props.changeHandler(event.target.value);
		this.setState({
			typedLocation: event.target.value,
		});
	};

	suggestionClickAndClear = (placeCoord) => {
		this.props.suggestionClickedHandler(placeCoord);
		this.setState({ typedLocation: '' });
		this.hideKeyboard();
	};

	hideKeyboard = () => {
		//this set timeout needed for case when hideKeyborad
		//is called inside of 'onfocus' event handler
		setTimeout(function () {
			//creating temp field
			var field = document.createElement('input');
			field.setAttribute('type', 'text');
			//hiding temp field from peoples eyes
			//-webkit-user-modify is nessesary for Android 4.x
			field.setAttribute(
				'style',
				'position:absolute; top: 0px; opacity: 0; -webkit-user-modify: read-write-plaintext-only; left:0px;'
			);
			document.body.appendChild(field);

			//adding onfocus event handler for out temp field
			field.onfocus = function () {
				//this timeout of 200ms is nessasary for Android 2.3.x
				setTimeout(function () {
					field.setAttribute('style', 'display:none;');
					setTimeout(function () {
						document.body.removeChild(field);
						document.body.focus();
					}, 14);
				}, 200);
			};
			//focusing it
			field.focus();
		}, 50);
	};

	render() {
		let fullDropDown = null;
		let ReceivedSuggestions = null;

		if (this.props.placesSuggestions.length && this.state.typedLocation) {
			const suggestionContent = this.props.placesSuggestions.map(
				(place, index) => (
					<PlaceSuggestion
						clicked={(placeCoord) =>
							this.suggestionClickAndClear(placeCoord)
						}
						// clicked={this.props.suggestionClickedHandler}
						key={index}
						suggestionText={place.name}
						suggestionCoordinates={place.coordinates}
					/>
				)
			);
			ReceivedSuggestions = suggestionContent;
		} else if (
			!this.props.placesSuggestions.length &&
			this.state.typedLocation
		) {
			ReceivedSuggestions = (
				<PlaceSuggestion
					suggestionText={'Brak wyników dla podanego adresu'}
				/>
			);
		}
		fullDropDown = (
			<div className={classes.fullDropDownContainer}>
				<div className={classes.fullDropDown}>
					{ReceivedSuggestions}
				</div>
			</div>
		);

		return (
			<div className={classes.InputCard}>
				<form onSubmit={(event) => this.submitFormHandler(event)}>
					<h1>
						<strong
							style={{
								fontSize: '40px',
								textTransform: 'uppercase',
								color: '#ae1100',
							}}
						>
							jakość powietrza
						</strong>
						<br />w twojej okolicy
					</h1>
					<div className={classes.InputForm}>
						<div className={classes.Left}>
							<label>
								<div className={classes.InputLabelBox}>
									<input
										className={classes.InputFormField}
										type='text'
										placeholder='Wpisz swoją lokalizację'
										onChange={(event) =>
											this.changeHandler(event)
										}
										value={this.state.typedLocation}
									/>
								</div>
								<div className={classes.fullDropDownContainer}>
									{fullDropDown}
								</div>
							</label>
						</div>
						<div className={classes.Right}>
							<GeoIcon
								geoIconClicked={this.props.geoIconClicked}
							/>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

export default LocationForm;
