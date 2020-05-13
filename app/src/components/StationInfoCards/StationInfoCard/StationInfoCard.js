import React from 'react';
import classes from './StationInfoCard.module.css';

const StationInfoCard = (props) => {
	// let paramValue = <Spinner />;

	return (
		<div className={classes.Param}>
			<div className={classes.ParamName}>{props.paramName}</div>
			<div className={classes.ParamValue}>
				{props.paramValue.value.toFixed(2)}
			</div>
		</div>
	);
};

export default StationInfoCard;
