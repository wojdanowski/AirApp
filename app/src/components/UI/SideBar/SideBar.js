import React from 'react';
import classes from './SideBar.module.css';
import HamburgerButton from '../Buttons/HamburgerButton/HamburgerButton';

const SideBar = (props) => {
	let attachedClasses = [classes.SideBarContainer, classes.Close];
	if (props.isOpen) {
		attachedClasses = [classes.SideBarContainer, classes.Open];
	}

	return (
		<div className={attachedClasses.join(' ')}>
			<HamburgerButton toggleSidebar={props.toggleSidebar} />
		</div>
	);
};

export default SideBar;
