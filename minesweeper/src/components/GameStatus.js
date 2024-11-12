import React from 'react';

function GameStatus({ remainingMines, gameStatus, onRestart }) {
    return (
        <div className="status">
            <p>Mines Left: {remainingMines}</p>
            <p>Status: {gameStatus}</p>
            {(gameStatus === 'win' || gameStatus === 'lose') && (
                <button onClick={onRestart}>Restart Game</button>
                )}
        </div>
    );
}

export default GameStatus;
