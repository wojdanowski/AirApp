import React from 'react';

import Spinner from './../../UI/Spinner/Spinner';
import classes from './StationInfoCard.module.css';

const StationInfoCard = (props) => {
	let paramValue = <Spinner />;

	return (
		<div className={classes.Param}>
			<div className={classes.ParamName}>{props.paramName}</div>
			<div className={classes.ParamValue}>{paramValue}</div>
		</div>
	);
};

export default StationInfoCard;
