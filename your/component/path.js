import React, { useContext } from 'react';
import { ColorModeContext } from '../App'; // Adjust the path as necessary

const YourComponent = () => {
  const { darkMode, toggleDarkMode } = useContext(ColorModeContext);

  return (
    <div>
      <h1>{darkMode ? 'Dark Mode' : 'Light Mode'}</h1>
      <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
    </div>
  );
};

export default YourComponent; 