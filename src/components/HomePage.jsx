import React from 'react';
import '../styles.css';

import Button from './shared/Button/Button';
import Stats from './Stats.jsx';

const HomePage = () => {
  return (
    <div>
      <header>
        <h1>☕ The Tea Room Gallery Tracker ☕</h1>
        <p className="subtitle">
          A clean guild flower tracker with search, sorting, point filters, ownership lookup, and
          shiny attribute badges.
        </p>
        <div>
          <Button label="View Players" onClick={() => (window.location.href = '/players')} />
          <Button label="View Flowers" onClick={() => (window.location.href = '/flowers')} />
        </div>
        <Stats />
      </header>
    </div>
  );
};

export default HomePage;
