import React from 'react';
import './App.css';

import EmailSubForm from './components/InputForms/EmailSubForm/EmailSubForm';
import LocationForm from './components/InputForms/LocationForm/LocationForm';

function App() {
	return (
		<div className='App'>
			<div className='InputCards'>
				<EmailSubForm />
				<LocationForm />
			</div>
			<div className='InfoCard'>
				<p>TUTAJ info o lokalizacji</p>
			</div>
		</div>
	);
}

export default App;
