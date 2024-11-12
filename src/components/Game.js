import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

import Grid from './Grid';
import GameStatus from './GameStatus';
import '../css/Game.css';


function Game({ rows, cols, mines }) {
    const title = `Minesweeper - ${rows}x${cols} with ${mines} Mines`;
    const [gameStatus, setGameStatus] = useState('notStarted');
    const [flaggedCells, setFlaggedCells] = useState(0);

    const startGame = () => {
        setGameStatus('playing');
    };

    const restartGame = () => {
        setGameStatus('notStarted');
        setFlaggedCells(0); // Reset flagged cells count on restart
    };

    const handleGameOver = (status) => {
        setGameStatus(status);
    };

    const handleFlagChange = (flaggedCount) => {
        setFlaggedCells(flaggedCount);
    };

    const remainingMines = mines - flaggedCells;

    return (
        <div className="game-container">
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <h1>Minesweeper</h1>
            {gameStatus === 'notStarted' && (
                <button onClick={startGame}>Start Game</button>
            )}

            {(gameStatus === 'playing' || gameStatus === 'win' || gameStatus === 'lose') && (
                <Grid
                    rows={rows}
                    cols={cols}
                    mines={mines}
                    gameOver={gameStatus === 'win' || gameStatus === 'lose'}
                    onGameOver={handleGameOver}
                    onFlagChange={handleFlagChange} // Pass flag change handler
                    revealAllOnGameOver={gameStatus !== 'playing'} // Trigger revealing cells on game over
                />
            )}

            {/* Use GameStatus component for game status display */}
            <GameStatus
                remainingMines={remainingMines}
                gameStatus={gameStatus}
                onRestart={restartGame} // Pass the restart handler
            />
        </div>
    );
}

export default Game;
