import React from 'react';
import './App.css';

import Layout from './hoc/Layout/Layout';
import Aux from './hoc/Auxiliary/Auxiliary';

function App() {
	return (
		<div className='App'>
			<Aux>
				<Layout />
			</Aux>
		</div>
	);
}

export default App;
