import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Flower = (props) => (
  <tr>
    <td>{props.flower.name}</td>
    <td>{props.flower.compPoints}</td>
  </tr>
);

export default function FlowerList() {
  const [flowers, setFlowers] = useState([]);

  // Fetch from db
  useEffect(() => {
    async function getFlowers() {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/flowers/`);
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

  // Map flowers onto table
  function FlowerList() {
    return flowers.map((flower) => {
      return <Flower flower={flower} key={flower._id} />;
    });
  }

  // Display table
  return (
    <div>
      <h3>Flowers List</h3>
      <table style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Competition Points</th>
          </tr>
        </thead>
        <tbody>{FlowerList()}</tbody>
      </table>
    </div>
  );
}
