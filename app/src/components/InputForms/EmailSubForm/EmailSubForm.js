import React from 'react';
import classes from '../InputForms.module.css';

const EmailSubForm = props => {
	return (
		<form>
			<div className={classes.segment}>
				<h1>Get email notification</h1>
			</div>

			<label>
				<input type='email' placeholder='Email Address' />
			</label>
			<label>
				<input type='text' placeholder='Location' />
			</label>
			<button className={classes.red} type='button'>
				<i className={classes.icon}></i> SUBSCRIBE
			</button>
		</form>
	);
};

export default EmailSubForm;
