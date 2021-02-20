import logo from './logo.svg';
import { createTheme, WuiProvider } from '@welcome-ui/core'
import JobPage from './pages/JobPage';

import './App.scss';


const theme = createTheme()

function App() {
  return (
    <WuiProvider theme={theme}>
      <div className="App">
        <header className="App__header">
          <img src={logo} className="App__logo" alt="logo" />
        </header>
        <div className="App__job">
          <JobPage />
        </div>
      </div>
    </WuiProvider>

  );
}

export default App;
