import React from 'react';
import StationInfoCard from './StationInfoCard/StationInfoCard';
import classes from './StationInfoCards.module.css';
import getClassNameFromIndexes from './../../Utils/getClassNameFromIndexes';

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

	const recommendationOptions = {
		VeryGood: 'Ruszaj na dwór! Szkoda spędzać taki dzień w domu.',
		Good: 'Zostań na dworze! Pyły są pod kontrolą.',
		Moderate: 'Jakiś plener dzisiaj? Chyba szaro to widzę…',
		Sufficient:
			'Jeszcze będzie dobrze, ale teraz ogranicz swoją aktywność na powietrzu.',
		Bad: 'Lepiej zamknij wszystkie okna, smog czai się za rogiem.',
		VeryBad:
			'Tylko spokój i maski przeciwpyłowe nas ocalą, ale ogranicz aktywność fizyczną – bieganie w masce nie poprawi twoich statystyk.',
		NoData: 'Brak danych',
	};

	const pm10Condition = getClassNameFromIndexes(
		'PM10',
		props.stationData.measurement
	)
		.split('condition')
		.join('');
	const recommendation = recommendationOptions[pm10Condition];
	const recommendationContent = (
		<p className={classes.DistanceInfo}>Rekomendacje: {recommendation}</p>
	);

	let pm10Level = 'Brak danych';
	if (props.stationData.measurement.length) {
		const pm10Item = props.stationData.measurement.filter((el) => {
			return el.param === 'PM10';
		});
		if (pm10Item.length) {
			pm10Level = pm10Item[0].indexLevel.indexLevelName;
		}
	}

	return (
		<div>
			<p className={classes.StationName}>
				{props.stationData.stationName}
			</p>
			<p className={classes.QualityInfo}>Poziom PM10: {pm10Level}</p>
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
			{recommendationContent}
		</div>
	);
};

export default StationInfoCards;
