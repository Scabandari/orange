import styled from 'styled-components';
import { Todos } from './components';

const AppContainer = styled.div`
	//height: 100vh;
//	width: 100vw;
`;
const App = () => {
	return (
		<AppContainer>
			<Todos />
		</AppContainer>
	);
};

export default App;
