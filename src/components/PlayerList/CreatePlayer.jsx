import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const { URL } = require('../../../config.js');

export default function Createplayer() {
  const [form, setForm] = useState({
    discord_id: '',
    name: '',
    flowers: '',
  });

  const navigate = useNavigate();
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // Handle the submission
  async function onSubmit(e) {
    e.preventDefault();
    // POST request sent to url, add new record
    const newPlayer = { ...form };
    await fetch(`${URL}/api/players/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPlayer),
    }).catch((error) => {
      window.alert(error);
      return;
    });
    setForm({ discord_id: '', name: '', flowers: '' });
    navigate('/');
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
          <input
            type="text"
            className="form-control"
            id="flowers"
            value={form.flowers}
            onChange={(e) => updateForm({ flowers: e.target.value })}
          />
        </div>
        <div className="form-group">
          <input type="submit" value="Create Player" />
        </div>
      </form>
    </div>
  );
}
