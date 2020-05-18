import React from 'react';
import classes from './StationInfoCard.module.css';

const StationInfoCard = (props) => {
	// let paramValue = <Spinner />;
	let value;
	props.paramValue
		? (value = props.paramValue.value.toFixed(2))
		: (value = '???');

	return (
		<div className={classes.Param}>
			<div className={classes.BigDot}>
				<b>{value}</b> µg/m<sup>3</sup>
			</div>
			<div className={classes.ParamName}>
				<h4>{props.paramName}</h4>
				<p>Norma: Kiedyś będzie....</p>
			</div>
		</div>
	);
};

export default StationInfoCard;
