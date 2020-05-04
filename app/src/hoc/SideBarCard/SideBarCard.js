import React from 'react';

import classes from './SideBarCard.module.css';

const SideBarCard = (props) => {
	return <div className={classes.SideBarCard}>{props.children}</div>;
};

export default SideBarCard;
