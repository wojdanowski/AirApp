import React, { useContext } from 'react';

import classes from './SideBar.module.css';
import HamburgerButton from '../Buttons/HamburgerButton/HamburgerButton';
import EmailSubForm from './../../InputForms/EmailSubForm/EmailSubForm';
import SideBarCard from '../../../hoc/SideBarCard/SideBarCard';
import UiContext from './../../../Context/UiContext';
import StationInfoCard from '../../StationInfoCards/StationInfoCards';

const SideBar = (props) => {
	const uiState = useContext(UiContext);

	let attachedClasses = [classes.SideBarContainer, classes.Close];
	if (uiState.showSidebar) {
		attachedClasses = [classes.SideBarContainer, classes.Open];
	}
	let stationInfo = null;
	if (props.stationData.sensorList) {
		stationInfo = <StationInfoCard stationData={props.stationData} />;
	}

	return (
		<div className={attachedClasses.join(' ')}>
			<HamburgerButton
				toggleSidebar={uiState.uiFunctions.toggleSidebar}
			/>
			<SideBarCard>
				{stationInfo}
				<EmailSubForm
					stationCoordinates={props.stationData.coordinates}
				/>
			</SideBarCard>
		</div>
	);
};

export default SideBar;
