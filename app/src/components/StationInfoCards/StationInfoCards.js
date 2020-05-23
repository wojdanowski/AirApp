import React, { useEffect } from 'react';
import StationInfoCard from './StationInfoCard/StationInfoCard';
import classes from './StationInfoCards.module.css';

const StationInfoCards = (props) => {
	const sensorsData = props.stationData.sensorsData;
	const distance = props.distanceToStation;
	let distanceInfo = null;

	if (distance) {
		distanceInfo = (
			<p className={classes.DistanceInfo}>
				Odległość od twojej lokalizacji: {distance.toFixed(2)} km.
			</p>
		);
	}

	return (
		<div>
			<p className={classes.StationName}>
				{props.stationData.stationName}
			</p>
			{distanceInfo}
			{sensorsData.map((el, index) => {
				if (el.values.length === 0) return null;

				let availableValue;
				el.values.some((el) => {
					availableValue = { ...el };
					return el.value !== null;
				});

				const contentToRender = (
					<StationInfoCard
						key={el._id}
						paramName={el.key}
						index={index}
						paramValue={availableValue}
						measurement={props.stationData.measurement}
					/>
				);

				return contentToRender;
			})}
		</div>
	);
};

export default StationInfoCards;
