import React, { useContext } from 'react';

import classes from './SideBar.module.css';
import HamburgerButton from '../Buttons/HamburgerButton/HamburgerButton';
import EmailSubForm from './../../InputForms/EmailSubForm/EmailSubForm';
import SideBarCard from '../../../hoc/SideBarCard/SideBarCard';
import UiContext from './../../../Context/UiContext';
import StationInfoCards from '../../StationInfoCards/StationInfoCards';
import Spinner from './../Spinner/Spinner';

const SideBar = (props) => {
	const uiState = useContext(UiContext);

	let attachedClasses = [classes.SideBarContainer, classes.Close];
	if (uiState.showSidebar) {
		attachedClasses = [classes.SideBarContainer, classes.Open];
	}

	let stationInfo = null;
	if (props.isSensorDataLoading && uiState.selectedStationId) {
		stationInfo = <Spinner />;
	} else if (props.stationData.sensorsData) {
		stationInfo = (
			<StationInfoCards
				stationData={props.stationData}
				distanceToStation={props.distanceToStation}
			/>
		);
	}

	let subscriptionContent = null;
	if (uiState.selectedStationId) {
		subscriptionContent = (
			<EmailSubForm stationCoordinates={props.stationData.coordinates} />
		);
	}
	return (
		<div className={attachedClasses.join(' ')}>
			<HamburgerButton
				toggleSidebar={uiState.uiFunctions.toggleSidebar}
			/>
			<SideBarCard>
				{stationInfo}
				{subscriptionContent}
			</SideBarCard>
		</div>
	);
};

export default SideBar;
