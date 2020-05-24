import React from 'react';

import Aux from './../../../hoc/Auxiliary/Auxiliary';

const options = [];
for (let i = 1; i <= 24; i++) {
	options[i] = `${i} : 00`;
}

const DropDown = (props) => {
	return (
		<Aux>
			<label>Wybierz godzinę</label>
			<select
				onChange={(event) => props.onChangeHandler(event)}
				className='form-control'
				id='paymentMethod'
			>
				<option value={0}>Godzina...</option>

				{options.map((el, index) => {
					return (
						<option key={index} value={index}>
							{el}
						</option>
					);
				})}
			</select>
		</Aux>
	);
};

export default DropDown;
