import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import Aux from './hoc/Auxiliary/Auxiliary';
import Layout from './containers/Layout/Layout';
import MainPage from './containers/MainPage/MainPage';
import SubActivate from './components/Screens/SubActivate/SubActivate';

function App() {
	return (
		<div className='App'>
			<Aux>
				<Layout>
					<Switch>
						<Route path='/activate' component={SubActivate} />
						<Route path='/' component={MainPage} />
					</Switch>
				</Layout>
			</Aux>
		</div>
	);
}

export default App;
