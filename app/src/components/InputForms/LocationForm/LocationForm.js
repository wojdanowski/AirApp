import React, { Component } from 'react';

import classes from './LocationForm.module.css';
import GeoIcon from './../../UI/GeoIcon/GeoIcon';
import PlaceSuggestion from './PlaceSuggestion/PlaceSuggestion';

class LocationForm extends Component {
	state = {
		typedLocation: '',
	};

	render() {
		let fullDropDown = null;
		let ReceivedSuggestions = null;

		if (this.props.placesSuggestions.length && this.state.typedLocation) {
			const suggestionContent = this.props.placesSuggestions.map(
				(place, index) => (
					<PlaceSuggestion
						clicked={this.props.suggestionClickedHandler}
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
				<form
					onSubmit={(event) => {
						event.preventDefault();
						this.props.changeHandler(this.state.typedLocation);
					}}
				>
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
										onChange={(event) => {
											this.props.changeHandler(
												event.target.value
											);
											this.setState({
												typedLocation:
													event.target.value,
											});
										}}
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
