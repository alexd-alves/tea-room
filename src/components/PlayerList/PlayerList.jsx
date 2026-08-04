// src/components/PlayerList/PlayerList.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '../shared/Button/Button.jsx';
import Navbar from '../shared/Navbar/Navbar.jsx';

import styles from './PlayerList.module.css';

const Header = ({ columns, sorting, sortTable }) => {
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <HeaderCell
            className={styles.playerscell}
            key={column.key}
            column={column}
            sorting={sorting}
            sortTable={sortTable}
          />
        ))}
      </tr>
    </thead>
  );
};

const HeaderCell = ({ column, sorting, sortTable }) => {
  const isDescSorting = sorting.column === column.key && sorting.order === 'desc';
  const isAscSorting = sorting.column === column.key && sorting.order === 'asc';
  const futureSortingOrder = isDescSorting ? 'asc' : 'desc';
  return (
    <th
      className={styles.playerscell}
      key={column.key}
      onClick={() => sortTable({ column: column.key, order: futureSortingOrder })}
    >
      {column.label}
      {isDescSorting && <span>▼</span>}
      {isAscSorting && <span>▲</span>}
    </th>
  );
};

const Player = ({ columns, player, deletePlayer }) => {
  return (
    <tr key={player.discord_id}>
      {columns.map((column) => (
        <td className={styles.playerscell} key={column.key}>
          {column.render ? column.render(player, deletePlayer) : player[column.key]}
        </td>
      ))}
    </tr>
  );
};

const PlayersTable = ({ columns, sorting, sortTable, players, deletePlayer }) => {
  return (
    <div>
      <table className={styles.playerstable}>
        <Header columns={columns} sorting={sorting} sortTable={sortTable} />
        <tbody>
          {players.map((player) => (
            <Player
              key={player.discord_id}
              columns={columns}
              player={player}
              deletePlayer={deletePlayer}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function PlayerList() {
  const columns = [
    { key: 'discord_id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'flowers', label: 'Flowers' },
    {
      key: 'action',
      label: 'Action',
      render: (player, deletePlayer) => (
        <>
          <Link to={`/edit/${player._id}`}>Edit</Link> |{' '}
          <button onClick={() => deletePlayer(player._id)}>Delete</button>
        </>
      ),
    },
  ];

  const [players, setPlayers] = useState([]);

  const [sorting, setSorting] = useState({ column: 'name', order: 'asc' });
  const sortTable = (newSorting) => {
    setSorting(newSorting);
  };

  // Fetch from db
  useEffect(() => {
    async function getPlayers() {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/players?_sort=${sorting.column}&_order=${sorting.order}`
      );
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
  }, [players.length, sorting]);

  // Delete player
  async function deletePlayer(id) {
    await fetch(`${import.meta.env.VITE_API_URL}/api/players/${id}`, {
      method: 'DELETE',
    });
    const newPlayers = players.filter((el) => el._id !== id);
    setPlayers(newPlayers);
  }

  // Display table
  return (
    <div>
      <Navbar />
      <div className={styles.header}>
        <span>
          <h2>Players List</h2>
        </span>
        <span>
          <Button label="Add Player" onClick={() => (window.location.href = '/players/create')} />
        </span>
      </div>
      <PlayersTable
        columns={columns}
        sorting={sorting}
        sortTable={sortTable}
        players={players}
        deletePlayer={deletePlayer}
      />
    </div>
  );
}
