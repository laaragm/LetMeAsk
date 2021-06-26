import { BrowserRouter, Route } from 'react-router-dom';
import { createContext, useState } from 'react';

import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';

import { CustomButton } from './components/CustomButton';

export const TestContext = createContext({} as any); // the argument of createContext is the format of the information you're going to store in the context

function App() {
	const [value, setValue] = useState('Teste');

	return (
		<BrowserRouter>
			{/* You're sending an info called 'teste' to all the components inside the tag */}
			<TestContext.Provider value={ { value, setValue } }> 
				<Route path="/" exact component={ Home } />
				<Route path="/rooms/new" component={ NewRoom } />
			</TestContext.Provider>
		</BrowserRouter>
	);
}

export default App;
