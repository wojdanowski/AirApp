import React from 'react';
import './App.css';

import Aux from './hoc/Auxiliary/Auxiliary';
import Layout from './containers/Layout/Layout';
import MainPage from './containers/MainPage/MainPage';

function App() {
	return (
		<div className='App'>
			<Aux>
				<Layout>
					<MainPage />
				</Layout>
			</Aux>
		</div>
	);
}

export default App;
