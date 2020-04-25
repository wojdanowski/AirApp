import React from 'react';

import classes from './PlaceSuggestion.module.css';

const PlaceSuggestion = (props) => {
	return (
		<div
			className={classes.singleSuggestion}
			onClick={() => props.clicked(props.suggestionCoordinates)}
		>
			{props.suggestionText}
		</div>
	);
};

export default PlaceSuggestion;
