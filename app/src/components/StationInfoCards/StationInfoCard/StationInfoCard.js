import React from 'react';
import classes from './StationInfoCard.module.css';
import getClassNameFromIndexes from './../../../Utils/getClassNameFromIndexes';
import { NORMS } from './../../../Utils/NORMS';

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

	return (
		<div className={classes.Param}>
			<div className={classes.DotContainer}>
				<div
					className={`${classes.BigDot} ${classes[bigDotClassName]}`}
				>
					<b>{value}</b> µg/m<sup>3</sup>
				</div>
			</div>
			<div className={classes.ParamName}>
				<h4>{props.paramName}</h4>
				<p>
					{`Norma: ${NORMS[props.paramName]}`} µg/m<sup>3</sup>
				</p>
			</div>
		</div>
	);
};

export default StationInfoCard;
