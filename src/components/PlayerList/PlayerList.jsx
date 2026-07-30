import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const { URL } = require('../../../config.js');

const Player = (props) => (
  <tr>
    <td>{props.player.discord_id}</td>
    <td>{props.player.name}</td>
    <td>{props.player.flowers}</td>
    <td>
      <Link to={`/edit/${props.player._id}`}>Edit</Link> |
      <button
        onClick={() => {
          props.deletePlayer(props.player._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default function PlayerList() {
  const [players, setPlayers] = useState([]);

  // Fetch from db
  useEffect(() => {
    async function getPlayers() {
      const response = await fetch(`${URL}/api/players/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const players = await response.json();
      setPlayers(players);
    }
    getPlayers();
    return;
  }, [players.length]);

  // Delete player
  async function deletePlayer(id) {
    await fetch(`${URL}/api/players/${id}`, {
      method: 'DELETE',
    });
    const newPlayers = players.filter((el) => el._id !== id);
    setPlayers(newPlayers);
  }

  // Map players onto table
  function PlayerList() {
    return players.map((player) => {
      return (
        <Player player={player} deletePlayer={() => deletePlayer(player._id)} key={player._id} />
      );
    });
  }

  // Display table
  return (
    <div>
      <h3>Players List</h3>
      <table style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Flowers</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{PlayerList()}</tbody>
      </table>
    </div>
  );
}
