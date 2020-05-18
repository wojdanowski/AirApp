import React from 'react';
import classes from './StationInfoCard.module.css';
import getClassNameFromIndexes from './../../../Utils/getClassNameFromIndexes';

const StationInfoCard = (props) => {
	// let paramValue = <Spinner />;
	let value;
	props.paramValue
		? (value = props.paramValue.value.toFixed(2))
		: (value = '???');

	const nameWithoutDot = props.paramName.split('.').join('');

	const bigDotClassName = getClassNameFromIndexes(
		nameWithoutDot,
		props.measurement
	);
	// const bigDotClassName = 'RedDot';

	return (
		<div className={classes.Param}>
			<div className={`${classes.BigDot} ${classes[bigDotClassName]}`}>
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
