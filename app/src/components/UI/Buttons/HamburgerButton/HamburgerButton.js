import React from 'react';

import classes from './HamburgerButton.module.css';

const HamburgerButton = (props) => {
	return (
		<div
			className={classes.HamburgerButtonBlock}
			onClick={props.toggleSidebar}
		>
			<div className={classes.bar}></div>
			<div className={classes.bar}></div>
			<div className={classes.bar}></div>
		</div>
	);
};

export default HamburgerButton;
