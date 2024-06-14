import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const User = () => {
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const [repos, setRepos] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = process.env.REACT_APP_GITHUB_TOKEN; 
        const options = { headers: { Authorization: `Bearer ${token}` } };

        const fetchUserData = async () => {
            try {
                const userResponse = await axios.get(`https://api.github.com/users/${username}`, options);
                setUser(userResponse.data);

                const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos`, options);
                setRepos(reposResponse.data);
            } catch (err) {
                setError('User not found');
                setUser(null);
            }
        };

        fetchUserData();
    }, [username]);

    if (error) {
        return <div><h2>{error}</h2></div>;
    }

    if (!user) {
        return <div><h2>Loading...</h2></div>;
    }

    const formatDate = (theDate) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(theDate);
        return date.toLocaleDateString(undefined, options);
    };

    return (
        <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.5 }}
        className="user-container"
        >
            <div className="user-container">
                <h2>{user.name}</h2>
                <img src={user.avatar_url} alt={`${user.login}'s avatar`} width={100} />
                <p>{user.bio}</p>
                <p>Followers: {user.followers}</p>
                <p>Following: {user.following}</p>
                <a className='goToPage' href={user.html_url} target="_blank" rel="noopener noreferrer">
                    View Profile on GitHub
                </a>

                <h3>Repositories</h3>
                <ul>
                    {repos.map(repo => (
                        <li key={repo.id}>
                            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                                {repo.name}
                            </a>
                            <p>{formatDate(repo.updated_at)}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
};

export default User;