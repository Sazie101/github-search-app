import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Search from "./components/Search";
import User from './components/User';

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/profile/:username" element={<User />} />
      </Routes>
    </main>
  );
}

export default App;