import React from 'react';

import classes from './Checkbox.module.css';
import Aux from './../../../hoc/Auxiliary/Auxiliary';

const Checkbox = (props) => {
	return (
		<Aux>
			<label
				className={classes.Container}
				onChange={(event) => {
					props.onChangeHandler({
						target: {
							day: props.day,
							value: event.target.checked,
						},
					});
				}}
			>
				{props.label}
				<input
					name={props.label}
					type='checkbox'
					checked={props.isChecked}
				/>
				<span className={classes.Checkmark}></span>
			</label>
		</Aux>
	);
};

export default Checkbox;
