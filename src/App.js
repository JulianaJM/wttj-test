import { useEffect } from 'react';
import logo from './logo.svg';
import { createTheme, WuiProvider } from '@welcome-ui/core'
import JobPage from './pages/JobPage';

import './App.scss';


const theme = createTheme()

function App() {

  useEffect(() => {
      const headerEl = document.querySelector('.App__header')
      const sentinalEl = document.querySelector('.sentinal')
      const handler = (entries) => {
        // entries is an array of observed dom nodes
        // we're only interested in the first one at [0]
        // because that's our .sentinal node.
        // Here observe whether or not that node is in the viewport
        if (!entries[0].isIntersecting) {
          headerEl.classList.add('sticky')
        } else {
          headerEl.classList.remove('sticky')
        }
      }
      // create the observer
      const observer = new window.IntersectionObserver(handler)
      // give the observer some dom nodes to keep an eye on
      observer.observe(sentinalEl)
  }, [])


  return (
    <WuiProvider theme={theme}>
      <div className="App">
        <div className="sentinal"></div>
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
