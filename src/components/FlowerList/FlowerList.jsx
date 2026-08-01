// src/components/FlowerList/FlowerList.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '../shared/Button/Button.jsx';
import Navbar from '../shared/Navbar/Navbar.jsx';

import styles from './FlowerList.module.css';

const Flower = (props) => (
  <tr>
    <td>
      {' '}
      <img
        src={props.flower.imgUrl}
        alt={props.flower.name}
        style={{ width: '100px', height: 'auto' }}
      />{' '}
    </td>
    <td>{props.flower.name}</td>
    <td>{props.flower.compPoints}</td>
    <td>
      <Link to={`/edit/${props.flower._id}`}>Edit</Link> |
      <button
        onClick={() => {
          props.deleteFlower(props.flower._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default function FlowerList() {
  const [flowers, setFlowers] = useState([]);

  // Fetch from db
  useEffect(() => {
    async function getFlowers() {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/flowers/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const flowers = await response.json();
      setFlowers(flowers);
    }
    getFlowers();
    return;
  }, [flowers.length]);

  // Delete flower
  async function deleteFlower(id) {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/flowers/${id}`, {
      method: 'GET',
    });
    if (!res.ok) {
      const message = `An error occurred: ${res.statusText}`;
      window.alert(message);
      return;
    }
    const data = await res.json();
    const publicUrl = data.imgUrl;
    const fileKey = publicUrl.substring(publicUrl.lastIndexOf('/') + 1);

    // Delete the file from the server
    await fetch(`${import.meta.env.VITE_API_URL}/api/upload/${fileKey}`, {
      method: 'DELETE',
    });

    // Delete the flower record from the database
    await fetch(`${import.meta.env.VITE_API_URL}/api/flowers/${id}`, {
      method: 'DELETE',
    });
    const newFlowers = flowers.filter((el) => el._id !== id);
    setFlowers(newFlowers);
  }

  // Map players onto table
  function FlowerList() {
    return flowers.map((flower) => {
      return (
        <Flower flower={flower} deleteFlower={() => deleteFlower(flower._id)} key={flower._id} />
      );
    });
  }

  // Display table
  return (
    <div>
      <Navbar />
      <div className={styles.header}>
        <span>
          <h2>Flowers List</h2>
        </span>
        <span>
          <Button label="Add Flower" onClick={() => (window.location.href = '/flowers/create')} />
        </span>
      </div>
      <table style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Competition Points</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{FlowerList()}</tbody>
      </table>
    </div>
  );
}
