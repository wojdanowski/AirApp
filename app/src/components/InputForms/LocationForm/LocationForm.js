import React, { Component } from 'react';

import classes from './LocationForm.module.css';
import GeoIcon from './../../UI/GeoIcon/GeoIcon';
import MainButton from './../../UI/Buttons/MainButton/MainButton';
import PlaceSuggestion from './PlaceSuggestion/PlaceSuggestion';

class LocationForm extends Component {
	state = {
		typedLocation: '',
	};

	//  componentDidUpdate(){

	//  }
	// const placesSuggestions = props.placesSuggestions;

	render() {
		let fullDropDown;

		if (this.props.placesSuggestions.length && this.state.typedLocation) {
			const sugestionsContent = this.props.placesSuggestions.map(
				(place) => <PlaceSuggestion suggestionText={place.name} />
			);
			fullDropDown = (
				<div className={classes.fullDropDown}>{sugestionsContent}</div>
			);
		} else if (
			!this.props.placesSuggestions.length &&
			this.state.typedLocation
		) {
			fullDropDown = (
				<div className={classes.fullDropDown}>
					<PlaceSuggestion
						suggestionText={'Brak wyników dla podanego adresu'}
					/>
				</div>
			);
		}

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
					<label>
						<div>
							<div className={classes.InputLabelBox}>
								<input
									className={classes.InputFormField}
									type='text'
									placeholder='Lokalizacja'
									onChange={(event) => {
										this.props.changeHandler(
											event.target.value
										);
										this.setState({
											typedLocation: event.target.value,
										});
									}}
								/>
								<GeoIcon
									geoIconClicked={this.props.geoIconClicked}
								/>
							</div>
							<div className={classes.fullDropDownContainer}>
								{fullDropDown}
							</div>
						</div>
					</label>
					<MainButton label='Subskrybuj lokalizację' />
					<MainButton label='pokaż na mapie' />
				</form>
			</div>
		);
	}
}

export default LocationForm;
