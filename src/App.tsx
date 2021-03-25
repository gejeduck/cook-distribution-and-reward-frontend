import React, { useState } from 'react';

import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { Main } from '@aragon/ui';
import { updateModalMode } from './utils/web3';
import { storePreference, getPreference } from './utils/storage';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import PoolList from "./components/PoolList";
import CookPoolList from "./components/CookPoolList";
import Distribution from "./components/Distribution";
import Admin from "./components/Admin";
import colors from './constants/colors';
import { Container, setConfiguration } from 'react-grid-system';
setConfiguration({ containerWidths: [540, 740, 960, 1180, 1540], defaultScreenClass: 'xl', maxScreenClass: 'xl' });

function App() {
  const storedTheme = getPreference('theme', 'light');

  const [user, setUser] = useState(''); // the current connected user
  const [theme, setTheme] = useState(storedTheme);

  const updateTheme = (newTheme: string) => {
    setTheme(newTheme);
    updateModalMode(newTheme);
    storePreference('theme', newTheme);
  };
  return (
    <Router>
      <Main style={{ background: 'radial-gradient(50% 50% at 50% 50%, #211257 0%, #0A0627 100%)' }} assetsUrl={`${process.env.PUBLIC_URL}/aragon-ui/`} theme={colors} layout={false}>
        <Container>
          <NavBar user={user} setUser={setUser} theme={theme} updateTheme={updateTheme} />

          <Switch>
            <Route path="/distribution/"><Distribution user={user} /></Route>
            <Route path="/pools/"><PoolList user={user} /></Route>
            <Route path="/cookpools/"><CookPoolList user={user} /></Route>
            <Route path="/admin/"><Admin user={user} /></Route>
            <Route path="/"><HomePage /></Route>
          </Switch>
        </Container>
      </Main>
    </Router>
  );
}

export default App;
