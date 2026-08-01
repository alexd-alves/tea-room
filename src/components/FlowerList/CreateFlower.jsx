// src/components/FlowerList/CreateFlower.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router';

export default function CreateFlower() {
  const [form, setForm] = useState({
    name: '',
    compPoints: '',
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
    const newFlower = { ...form };
    await fetch(`${import.meta.env.VITE_API_URL}/api/flowers/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFlower),
    }).catch((error) => {
      window.alert(error);
      return;
    });
    setForm({ name: '', compPoints: '' });
    navigate('/flowers');
  }

  // Display form
  return (
    <div>
      <h3>Create New Flower</h3>
      <form onSubmit={onSubmit}>
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
          <label htmlFor="compPoints">Competition Points</label>
          <input
            type="text"
            className="form-control"
            id="comp-points"
            value={form.compPoints}
            onChange={(e) => updateForm({ compPoints: e.target.value })}
          />
        </div>
        <div className="form-group">
          <input type="submit" value="Create Flower" />
        </div>
      </form>
    </div>
  );
}
