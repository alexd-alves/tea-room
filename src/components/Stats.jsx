// src/components/Stats.jsx

import React, { useState, useEffect } from 'react';

import Stat from './shared/Stat/Stat.jsx';

import styles from './Stats.module.css';

export default function Stats() {
  const [playerCount, setPlayerCount] = React.useState(0);
  const [flowerCount, setFlowerCount] = React.useState(0);

  useEffect(() => {
    async function getPlayerCount() {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/players/get/count`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const playerCount = await response.json();
      setPlayerCount(playerCount.count);
    }

    async function getFlowerCount() {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/flowers/get/count`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const flowerCount = await response.json();
      setFlowerCount(flowerCount.count);
    }

    getPlayerCount();
    getFlowerCount();
    return;
  }, [playerCount, flowerCount]);

  return (
    <section className={styles.stats}>
      <Stat label="Total Members" value={playerCount} />
      <Stat label="Total Listed Flowers" value="0" />
      <Stat label="Unique Flower Names" value={flowerCount} />
      <Stat label="Flowers With Attributes" value="0" />
      <Stat label="Highest Collection Count" value="0" />
    </section>
  );
}
