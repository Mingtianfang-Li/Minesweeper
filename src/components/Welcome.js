import React from 'react';
import { useNavigate } from 'react-router-dom';

function Welcome() {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to Minesweeper!</h1>
            <p>Select your difficulty:</p>
            <button onClick={() => navigate('/game/easy')}>Easy</button>
            <button onClick={() => navigate('/game/medium')}>Medium</button>
            <button onClick={() => navigate('/game/hard')}>Hard</button>
        </div>
    );
}

export default Welcome;
