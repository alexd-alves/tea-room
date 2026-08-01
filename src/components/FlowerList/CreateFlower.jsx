// src/components/FlowerList/CreateFlower.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function CreateFlower() {
  const [form, setForm] = useState({
    imgUrl: '',
    name: '',
    compPoints: '',
  });
  const [file, setFile] = useState(null);

  const navigate = useNavigate();
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle the submission
  async function onSubmit(e) {
    e.preventDefault();
    // POST request sent to url, add new record

    // Upload file first and get the URL
    if (!file) {
      alert('Select a file first.');
      return;
    }

    const imgData = new FormData();
    imgData.append('file', file);

    let resdata;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/upload/`, {
        method: 'POST',
        body: imgData,
      });
      resdata = await res.json();
    } catch (err) {
      console.error(err);
      alert('File upload failed.');
      return;
    }

    // Then create the flower with the uploaded image URL
    const newFlower = { ...form, imgUrl: resdata.publicUrl };
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

    setForm({ imageUrl: '', name: '', compPoints: '' });
    navigate('/flowers');
  }

  // Display form
  return (
    <div>
      <h3>Create New Flower</h3>
      <input type="file" onChange={handleFileChange} />
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
