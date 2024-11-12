import React from 'react';
import '../css/Cell.css';

// Import images
import MineImage from '../assets/image/Mine.png';
import FlagImage from '../assets/image/flag.png';

function Cell({ isMine, nearbyMines, onReveal, onFlag, revealed, flagged }) {
    const handleClick = () => {
        if (!flagged) onReveal();
    };

    const handleRightClick = (e) => {
        e.preventDefault();
        onFlag();
    };

    return (
        <div
            className={`cell ${revealed ? 'revealed' : ''} ${flagged ? 'flagged' : ''}`}
            onClick={handleClick}
            onContextMenu={handleRightClick}
        >
            {revealed ? (
                isMine ? (
                    <img src={MineImage} alt="Mine" />
                ) : nearbyMines > 0 ? (
                    nearbyMines
                ) : (
                    ''
                )
            ) : flagged ? (
                <img src={FlagImage} alt="Flag" />
            ) : (
                ''
            )}
        </div>
    );
}

export default Cell;
