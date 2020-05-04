import React from 'react';
import StationInfoCard from './StationInfoCard/StationInfoCard';

const StationInfoCards = (props) => {
	const content = props.stationData.sensorList;

	return (
		<div>
			<p>{props.stationData.stationName}</p>
			{content.map((el, index) => {
				let showSpinner = true;
				if (
					props.stationData.sensorsData &&
					props.stationData.sensorsData[index]
				) {
					showSpinner = false;
				}
				return (
					<StationInfoCard
						key={el.id}
						paramName={el.param.paramName}
						index={index}
						sensorsData={props.stationData.sensorsData}
						isDataLoading={showSpinner}
					/>
				);
			})}
		</div>
	);
};

export default StationInfoCards;
