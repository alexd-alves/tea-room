// src/components/PlayerList/CreatePlayer.jsx

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';

import styles from './CreatePlayer.module.css';

export default function Createplayer() {
  const [form, setForm] = useState({
    discord_id: '',
    name: '',
    flowers: [],
  });

  const [flowers, setFlowers] = useState([]);
  const [search, setSearch] = useState('');
  const [showFlowerList, setShowFlowerList] = useState(false);
  const flowerSearchRef = useRef(null);

  const navigate = useNavigate();

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // Handle closing search dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (flowerSearchRef.current && !flowerSearchRef.current.contains(event.target)) {
        setShowFlowerList(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Fetch flowers
  useEffect(() => {
    async function getFlowers() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/flowers`);
        if (!res.ok) {
          window.alert(`Error: ${res.statusText}`);
          return;
        }

        const data = await res.json();
        setFlowers(data);
      } catch (error) {
        window.alert(error.message);
      }
    }
    getFlowers();
  }, []);

  // Filter based on search
  const filteredFlowers = search
    ? flowers.filter((flower) => flower.name.toLowerCase().includes(search.toLowerCase()))
    : flowers;

  // Add to player
  function addFlower(flower) {
    const isSelected = form.flowers.includes(flower._id);

    if (isSelected) {
      updateForm({
        flowers: form.flowers.filter((id) => id !== flower._id),
      });
    } else {
      updateForm({
        flowers: [...form.flowers, flower._id],
      });
    }
  }

  // Remove flower
  function removeFlower(id) {
    updateForm({
      flowers: form.flowers.filter((flowerId) => flowerId !== id),
    });
  }

  // Handle the submission
  async function onSubmit(e) {
    e.preventDefault();
    // POST request sent to url, add new record
    const newPlayer = { ...form };
    await fetch(`${import.meta.env.VITE_API_URL}/api/players/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPlayer),
    }).catch((error) => {
      window.alert(error);
      return;
    });
    setForm({ discord_id: '', name: '', flowers: [] });
    navigate('/players');
  }

  // Display form
  return (
    <div>
      <h3>Create New Player</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="discord_id">Discord ID</label>
          <input
            type="text"
            className="form-control"
            id="discord_id"
            value={form.discord_id}
            onChange={(e) => updateForm({ discord_id: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="flowers">Flowers</label>
          <div ref={flowerSearchRef} className={styles.flowerSearchContainer}>
            <input
              type="text"
              className="form-control"
              id="flowers"
              placeholder="Search flowers"
              value={search}
              onFocus={() => setShowFlowerList(true)}
              onChange={(e) => setSearch(e.target.value)}
            />

            {showFlowerList && (
              <ul className={styles.flowerDropdown}>
                {filteredFlowers.map((flower) => {
                  const isSelected = form.flowers.includes(flower._id);
                  return (
                    <li
                      key={flower._id}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        addFlower(flower);
                      }}
                      className={`${styles.flowerOption} 
                       ${isSelected ? styles.selectedFlower : ''}`}
                      style={{ cursor: 'pointer' }}
                    >
                      {flower.name}

                      {isSelected && <span className={styles.checkmark}>✓</span>}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div>
            <h4>Selected flowers</h4>
            {form.flowers.map((flowerId) => {
              const flower = flowers.find((f) => f._id === flowerId);

              return (
                <div key={flowerId}>
                  {flower?.name}

                  <button type="button" onClick={() => removeFlower(flowerId)}>
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Create Player" />
        </div>
      </form>
    </div>
  );
}
