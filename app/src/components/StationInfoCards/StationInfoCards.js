import React from 'react';
import StationInfoCard from './StationInfoCard/StationInfoCard';

const StationInfoCards = (props) => {
	const sensorsData = props.stationData.sensorsData;

	return (
		<div>
			<p>{props.stationData.stationName}</p>
			{sensorsData.map((el, index) => {
				let availableValue;
				el.values.some((el) => {
					availableValue = { ...el };
					return el.value !== null;
				});

				return (
					<StationInfoCard
						key={el._id}
						paramName={el.key}
						index={index}
						paramValue={availableValue}
					/>
				);
			})}
		</div>
	);
};

export default StationInfoCards;
