// src/components/shared/Navbar/Navbar.jsx

import React from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div>
        <a className={styles.navbarLinkLeft} href="/">
          ☕ The Tea Room Gallery Tracker ☕
        </a>
      </div>
      <div>
        <a className={styles.navbarLinkRight} href="/players">
          Players
        </a>
        <a className={styles.navbarLinkRight} href="/flowers">
          Flowers
        </a>
      </div>
    </nav>
  );
}
