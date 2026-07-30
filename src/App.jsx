import logo from './logo.svg';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Components
import PlayerList from './components/PlayerList.jsx';
import CreatePlayer from './components/CreatePlayer.jsx';
import FlowerList from './components/FlowerList.jsx';
import HomePage from './components/HomePage.jsx';

import './styles.css';

const App = () => {
  return (
    <div>
      <div>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/players" element={<PlayerList />} />
          <Route path="/players/create" element={<CreatePlayer />} />
          <Route exact path="/flowers" element={<FlowerList />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
