import React from 'react';
import './App.css';

import Aux from './hoc/Auxiliary/Auxiliary';
import Layout from './containers/Layout/Layout';

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
