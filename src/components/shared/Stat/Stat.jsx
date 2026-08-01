// src/components/shared/Stat/Stat.jsx

import React from 'react';

import styles from './Stat.module.css';

export default function Stat({ label = '0', value = 'Stat' }) {
  return (
    <div className={styles.stat}>
      <strong className={styles.strong}>{value}</strong>
      <span className={styles.span}>{label}</span>
    </div>
  );
}
