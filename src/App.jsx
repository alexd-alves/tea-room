import logo from './logo.svg';
import { useEffect, useState } from 'react';
import Test from './components/Test.jsx';

import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api')
      .then((response) => response.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <>
      <div>
        <Test />
      </div>
      <div>{message}</div>
    </>
  );
}

export default App;
