import React from 'react';

const StationInfoCard = (props) => {
	const spinner = <p>spinner</p>;
	let measurment = null;

	return (
		<div>
			<div>{props.paramName}</div>
			<div>{spinner}</div>
		</div>
	);
};

export default StationInfoCard;
