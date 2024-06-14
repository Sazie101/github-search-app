import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Github from '../img/github.svg';
import { motion } from 'framer-motion';

function Search() {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
      setUsername(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (username.trim()) {
        navigate(`/profile/${username.trim()}`);
      }
    };

  return (
    <motion.div
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 50 }}
    transition={{ duration: 0.5 }}
    className="search-container"
    >
        <div className="container holder">
            <div className='search'>
                <img src={Github} width={100} height={100} alt='GitHub'/>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={username}
                        onChange={handleInputChange}
                        placeholder="User name"
                        required
                    />
                </form>
            </div>
        </div>
    </motion.div>
  )
}

export default Search;