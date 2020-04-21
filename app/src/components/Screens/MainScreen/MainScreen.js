import React from 'react';

import LocationForm from './../../InputForms/LocationForm/LocationForm';
import classes from './MainScreen.module.css';

const MainScreen = (props) => {
	return (
		<div className={classes.MainScreenBox}>
			<LocationForm />
		</div>
	);
};

export default MainScreen;
