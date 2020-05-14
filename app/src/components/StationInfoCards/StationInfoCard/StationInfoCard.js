import React from 'react';
import classes from './StationInfoCard.module.css';

const StationInfoCard = (props) => {
	// let paramValue = <Spinner />;
	let value;
	props.paramValue
		? (value = props.paramValue.value.toFixed(2))
		: (value = 'Brak danych');

	return (
		<div className={classes.Param}>
			<div className={classes.ParamName}>{props.paramName}</div>
			<div className={classes.ParamValue}>{value}</div>
		</div>
	);
};

export default StationInfoCard;
